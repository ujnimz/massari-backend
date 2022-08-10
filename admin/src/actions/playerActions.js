import {
  SET_LOADING,
  SET_PLAY,
  SET_PAUSE,
  SET_REPEAT,
  SET_SHUFFLE,
  SET_DURATION,
  SET_CURRENT_TRACK,
  SET_NEXT_TRACK,
  SET_PREVIOUS_TRACK,
  ADD_TRACK,
  REMOVE_TRACK,
  SHUFFLE,
} from './types';

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
// TOGGLE PLAY
export const setPlay = () => {
  return {
    type: SET_PLAY,
  };
};

export const setPause = () => {
  return {
    type: SET_PAUSE,
  };
};

export const setRepeat = () => {
  return {
    type: SET_REPEAT,
  };
};

export const setShuffle = () => {
  return {
    type: SET_SHUFFLE,
  };
};

export const shufflePlaylist = playlist => dispatch => {
  console.log(playlist);
  dispatch(setShuffle());
  dispatch({
    type: SHUFFLE,
    payload: playlist,
  });
};

export const setDuration = duration => {
  return {
    type: SET_DURATION,
    payload: duration,
  };
};

export const setCurTrack = id => {
  return {
    type: SET_CURRENT_TRACK,
    payload: id,
  };
};

export const setNextTrack = id => {
  return {
    type: SET_NEXT_TRACK,
    payload: id,
  };
};

export const setPreviousTrack = id => {
  return {
    type: SET_PREVIOUS_TRACK,
    payload: id,
  };
};

export const addTrack = track => {
  return {
    type: ADD_TRACK,
    payload: track,
  };
};

export const removeTrack = id => {
  return {
    type: REMOVE_TRACK,
    payload: id,
  };
};
