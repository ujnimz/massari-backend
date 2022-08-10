import axios from 'axios';

import {
  GET_GENRES,
  GET_GENRE,
  ADD_GENRE,
  DELETE_GENRE,
  UPDATE_GENRE,
  LOADING_GENRES,
  SAVING_GENRES,
  CLEAR_GENRES,
} from './types';

import {setAlert} from './alertActions';

// GET ALL
export const getGenres = () => async dispatch => {
  dispatch(setGenresLoading());
  try {
    const res = await axios.get('/api/genres');
    dispatch({
      type: GET_GENRES,
      payload: res.data.payload,
    });
  } catch (err) {
    dispatch({
      type: GET_GENRES,
      payload: {},
    });
    dispatch(setAlert(err.response.data.message, err.response.data.status));
  }
};

// GET ONE
export const getGenre = id => async dispatch => {
  dispatch(setGenresLoading());
  try {
    const res = await axios.get(`/api/genres/${id}`);
    dispatch({
      type: GET_GENRE,
      payload: res.data.payload,
    });
  } catch (err) {
    dispatch({
      type: GET_GENRE,
      payload: {},
    });
    dispatch(setAlert(err.response.data.message, err.response.data.status));
  }
};

// ADD ONE
export const addGenre = genre => async dispatch => {
  dispatch(setGenresSaving());
  try {
    const res = await axios.post('/api/genres', genre);
    dispatch({
      type: ADD_GENRE,
    });
    dispatch(setAlert(res.data.message, res.data.status));
  } catch (err) {
    dispatch({
      type: ADD_GENRE,
      payload: {},
    });
    dispatch(setAlert(err.response.data.message, err.response.data.status));
  }
};

// UPDATE ONE
export const updateGenre = (id, genre) => async dispatch => {
  dispatch(setGenresSaving());
  try {
    const res = await axios.put(`/api/genres/${id}`, genre);
    dispatch({
      type: UPDATE_GENRE,
    });
    dispatch(setAlert(res.data.message, res.data.status));
    dispatch(getGenres());
  } catch (err) {
    dispatch({
      type: UPDATE_GENRE,
    });
    dispatch(setAlert(err.response.data.message, err.response.data.status));
  }
};

// DELETE ONE
export const deleteGenre = id => async dispatch => {
  dispatch(setGenresSaving());
  try {
    const res = await axios.delete(`/api/genres/${id}`);
    dispatch({
      type: DELETE_GENRE,
    });
    dispatch(setAlert(res.data.message, res.data.status));
    dispatch(getGenres());
  } catch (err) {
    dispatch({
      type: DELETE_GENRE,
    });
    dispatch(setAlert(err.response.data.message, err.response.data.status));
  }
};

// LOADING
export const setGenresLoading = () => {
  return {
    type: LOADING_GENRES,
  };
};

// SAVING
export const setGenresSaving = () => {
  return {
    type: SAVING_GENRES,
  };
};

// CLEAR
export const clearGenres = () => {
  return {
    type: CLEAR_GENRES,
  };
};
