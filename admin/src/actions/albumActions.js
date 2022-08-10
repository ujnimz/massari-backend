import axios from 'axios';
import {
  GET_ALBUMS,
  GET_ALBUM,
  CLEAR_ALBUMS,
  LOADING_ALBUMS,
  SAVING_ALBUMS,
  ADD_ALBUM,
  UPDATE_ALBUM,
  DELETE_ALBUM,
} from './types';

import {setAlert} from '../actions/alertActions';

// GET ALL
export const getAlbums = () => async dispatch => {
  dispatch(setAlbumsLoading());
  dispatch(clearAlbums());
  try {
    const res = await axios.get('/api/albums');
    dispatch({
      type: GET_ALBUMS,
      payload: res.data.payload,
    });
  } catch (err) {
    dispatch({
      type: GET_ALBUMS,
      payload: {},
    });
    dispatch(setAlert(err.response.data.message, err.response.data.status));
  }
};

// GET ONE
export const getAlbum = id => async dispatch => {
  dispatch(setAlbumsLoading());
  try {
    const res = await axios.get(`/api/albums/${id}`);
    dispatch({
      type: GET_ALBUM,
      payload: res.data.payload,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, err.response.data.status));
  }
};

// ADD ONE
export const addAlbum = album => async dispatch => {
  dispatch(setAlbumsSaving());
  try {
    const res = await axios.post('/api/albums', album);
    dispatch({
      type: ADD_ALBUM,
      payload: res.data.payload,
    });
    dispatch(setAlert(res.data.message, res.data.status));
    dispatch(getAlbums());
  } catch (err) {
    dispatch({
      type: ADD_ALBUM,
      payload: {},
    });
    dispatch(setAlert(err.response.data.message, err.response.data.status));
  }
};

// UPDATE ONE
export const updateAlbum = (id, album) => async dispatch => {
  dispatch(setAlbumsSaving());
  try {
    const res = await axios.put(`/api/albums/${id}`, album);
    dispatch({
      type: UPDATE_ALBUM,
    });
    dispatch(setAlert(res.data.message, res.data.status));
    dispatch(getAlbums());
  } catch (err) {
    dispatch({
      type: UPDATE_ALBUM,
    });
    dispatch(setAlert(err.response.data.message, err.response.data.status));
  }
};

// DELETE ONE
export const deleteAlbum = id => async dispatch => {
  dispatch(setAlbumsSaving());
  try {
    const res = await axios.delete(`/api/albums/${id}`);
    dispatch({
      type: DELETE_ALBUM,
    });
    dispatch(setAlert(res.data.message, res.data.status));
    dispatch(getAlbums());
  } catch (err) {
    dispatch({
      type: DELETE_ALBUM,
    });
    dispatch(setAlert(err.response.data.message, err.response.data.status));
  }
};

// LOADING
export const setAlbumsLoading = () => {
  return {
    type: LOADING_ALBUMS,
  };
};

// SAVING
export const setAlbumsSaving = () => {
  return {
    type: SAVING_ALBUMS,
  };
};

// CLEAR
export const clearAlbums = () => {
  return {
    type: CLEAR_ALBUMS,
  };
};
