import axios from 'axios';
import {
  GET_SINGLES,
  GET_SINGLE,
  LOADING_SINGLES,
  SAVING_SINGLES,
  CLEAR_SINGLES,
  DELETE_SINGLE,
  ADD_SINGLE,
  UPDATE_SINGLE,
} from './types';

import {setAlert} from './alertActions';

// GET ALL
export const getSingles = () => async dispatch => {
  dispatch(setSinglesLoading());
  try {
    const res = await axios.get('/api/singles');
    dispatch({
      type: GET_SINGLES,
      payload: res.data.payload,
    });
  } catch (err) {
    dispatch({
      type: GET_SINGLES,
      payload: {},
    });
    dispatch(setAlert(err.response.data.message, err.response.data.status));
  }
};

// GET ONE
export const getSingle = id => async dispatch => {
  dispatch(setSinglesLoading());
  try {
    const res = await axios.get(`/api/singles/${id}`);
    dispatch({
      type: GET_SINGLE,
      payload: res.data.payload,
    });
  } catch (err) {
    dispatch({
      type: GET_SINGLE,
      payload: {},
    });
    dispatch(setAlert(err.response.data.message, err.response.data.status));
  }
};

// ADD ONE
export const addSingle = single => async dispatch => {
  dispatch(setSinglesSaving());
  try {
    const res = await axios.post('/api/singles', single);
    dispatch({
      type: ADD_SINGLE,
    });
    dispatch(setAlert(res.data.message, res.data.status));
    dispatch(getSingles());
  } catch (err) {
    dispatch({
      type: ADD_SINGLE,
    });
    dispatch(setAlert(err.response.data.message, err.response.data.status));
  }
};

// UPDATE ONE
export const updateSingle = (id, single) => async dispatch => {
  dispatch(setSinglesSaving());
  try {
    const res = await axios.put(`/api/singles/${id}`, single);
    dispatch({
      type: UPDATE_SINGLE,
    });
    dispatch(setAlert(res.data.message, res.data.status));
    dispatch(getSingles());
  } catch (err) {
    dispatch({
      type: UPDATE_SINGLE,
    });
    dispatch(setAlert(err.response.data.message, err.response.data.status));
  }
};

// DELETE ONE
export const deleteSingle = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/singles/${id}`);
    dispatch({
      type: DELETE_SINGLE,
    });
    dispatch(setAlert(res.data.message, res.data.status));
    dispatch(getSingles());
  } catch (err) {
    dispatch({
      type: DELETE_SINGLE,
    });
    dispatch(setAlert(err.response.data.message, err.response.data.status));
  }
};

// LOADING
export const setSinglesLoading = () => {
  return {
    type: LOADING_SINGLES,
  };
};

// SAVING
export const setSinglesSaving = () => {
  return {
    type: SAVING_SINGLES,
  };
};

// CLEAR
export const clearSingles = () => {
  return {
    type: CLEAR_SINGLES,
  };
};
