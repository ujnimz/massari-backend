import axios from 'axios';
import {
  GET_ARTISTS,
  GET_ARTIST,
  ADD_ARTIST,
  DELETE_ARTIST,
  UPDATE_ARTIST,
  LOADING_ARTISTS,
  CLEAR_ARTISTS,
  SAVING_ARTISTS,
} from './types';

import {setAlert} from './alertActions';

// GET ALL
export const getArtists = () => async dispatch => {
  dispatch(setArtistsLoading());
  try {
    const res = await axios.get('/api/artists');
    console.log(res);
    dispatch({
      type: GET_ARTISTS,
      payload: res.data.payload,
    });
    //dispatch(setAlert(res.data.message, res.data.status));
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_ARTISTS,
      payload: {},
    });
    dispatch(setAlert(err.response.data.message, err.response.data.status));
  }
};

// GET ONE
export const getArtist = id => async dispatch => {
  dispatch(setArtistsLoading());
  try {
    const res = await axios.get(`/api/artists/${id}`);
    dispatch({
      type: GET_ARTIST,
      payload: res.data.payload,
    });
  } catch (err) {
    dispatch({
      type: GET_ARTIST,
      payload: {},
    });
    dispatch(setAlert(err.response.data.message, err.response.data.status));
  }
};

// ADD ONE
export const addArtist = artist => async dispatch => {
  dispatch(setArtistsSaving());
  try {
    const res = await axios.post('/api/artists', artist);
    dispatch({
      type: ADD_ARTIST,
    });
    dispatch(setAlert(res.data.message, res.data.status));
  } catch (err) {
    dispatch({
      type: ADD_ARTIST,
    });
    dispatch(setAlert(err.response.data.message, err.response.data.status));
  }
};

// UPDATE ONE
export const updateArtist = (id, artist) => async dispatch => {
  dispatch(setArtistsSaving());
  try {
    const res = await axios.put(`/api/artists/${id}`, artist);
    dispatch({
      type: UPDATE_ARTIST,
    });
    dispatch(setAlert(res.data.message, res.data.status));
  } catch (err) {
    dispatch({
      type: UPDATE_ARTIST,
    });
    dispatch(setAlert(err.response.data.message, err.response.data.status));
  }
};

// DELETE ONE
export const deleteArtist = id => async dispatch => {
  dispatch(setArtistsSaving());
  try {
    const res = await axios.delete(`/api/artists/${id}`);
    dispatch({
      type: DELETE_ARTIST,
    });
    dispatch(setAlert(res.data.message, res.data.status));
    dispatch(getArtists());
  } catch (err) {
    dispatch({
      type: DELETE_ARTIST,
    });
    dispatch(setAlert(err.response.data.message, err.response.data.status));
  }
};

export const setArtistsLoading = () => {
  return {
    type: LOADING_ARTISTS,
  };
};

export const setArtistsSaving = () => {
  return {
    type: SAVING_ARTISTS,
  };
};

export const clearArtists = () => {
  return {
    type: CLEAR_ARTISTS,
  };
};
