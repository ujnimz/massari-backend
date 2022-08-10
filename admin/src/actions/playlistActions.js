import axios from 'axios';
import {
  GET_PLAYLISTS,
  GET_PLAYLIST,
  CLEAR_PLAYLISTS,
  LOADING_PLAYLISTS,
  SAVING_PLAYLISTS,
  ADD_PLAYLIST,
  UPDATE_PLAYLIST,
  DELETE_PLAYLIST,
} from './types';

import {setAlert} from '../actions/alertActions';

// GET ALL
export const getPlaylists = () => async dispatch => {
  dispatch(setPlaylistLoading());
  try {
    const res = await axios.get('/api/playlists');
    dispatch({
      type: GET_PLAYLISTS,
      payload: res.data.payload,
    });
  } catch (err) {
    dispatch({
      type: GET_PLAYLISTS,
      payload: {},
    });
    dispatch(setAlert(err.response.data.message, err.response.data.status));
  }
};

// GET ONE
export const getPlaylist = id => async dispatch => {
  dispatch(setPlaylistLoading());
  try {
    const res = await axios.get(`/api/playlists/${id}`);
    dispatch({
      type: GET_PLAYLIST,
      payload: res.data.payload,
    });
  } catch (err) {
    dispatch({
      type: GET_PLAYLIST,
      payload: {},
    });
    dispatch(setAlert(err.response.data.message, err.response.data.status));
  }
};

// ADD ONE
export const addPlaylist = playlist => async dispatch => {
  dispatch(setPlaylistSaving());
  try {
    const res = await axios.post('/api/playlists', playlist);
    dispatch({
      type: ADD_PLAYLIST,
      payload: res.data.payload,
    });
    dispatch(setAlert(res.data.message, res.data.status));
    dispatch(getPlaylists());
  } catch (err) {
    dispatch({
      type: ADD_PLAYLIST,
      payload: {},
    });
    dispatch(setAlert(err.response.data.message, err.response.data.status));
  }
};

// UPDATE ONE
export const updatePlaylist = (id, playlist) => async dispatch => {
  dispatch(setPlaylistSaving());
  try {
    const res = await axios.put(`/api/playlists/${id}`, playlist);
    dispatch({
      type: UPDATE_PLAYLIST,
    });
    dispatch(setAlert(res.data.message, res.data.status));
    dispatch(getPlaylists());
  } catch (err) {
    dispatch({
      type: UPDATE_PLAYLIST,
    });
    dispatch(setAlert(err.response.data.message, err.response.data.status));
  }
};

// DELETE ONE
export const deletePlaylist = id => async dispatch => {
  dispatch(setPlaylistSaving());
  try {
    const res = await axios.delete(`/api/playlists/${id}`);
    dispatch({
      type: DELETE_PLAYLIST,
    });
    dispatch(setAlert(res.data.message, res.data.status));
    dispatch(getPlaylists());
  } catch (err) {
    dispatch({
      type: DELETE_PLAYLIST,
    });
    dispatch(setAlert(err.response.data.message, err.response.data.status));
  }
};

// LOADING
export const setPlaylistLoading = () => {
  return {
    type: LOADING_PLAYLISTS,
  };
};

// SAVING
export const setPlaylistSaving = () => {
  return {
    type: SAVING_PLAYLISTS,
  };
};

// CLEAR
export const clearPlaylists = () => {
  return {
    type: CLEAR_PLAYLISTS,
  };
};
