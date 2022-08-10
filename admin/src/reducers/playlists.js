import {
  GET_PLAYLISTS,
  GET_PLAYLIST,
  CLEAR_PLAYLISTS,
  LOADING_PLAYLISTS,
  SAVING_PLAYLISTS,
  ADD_PLAYLIST,
  UPDATE_PLAYLIST,
  DELETE_PLAYLIST,
} from '../actions/types';

const initialState = {
  playlistsList: [],
  loading: false,
  saving: false,
};

const playlists = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case GET_PLAYLISTS:
      return {
        ...state,
        playlistsList: payload,
        loading: false,
      };
    case GET_PLAYLIST:
      return {
        ...state,
        playlistsList: payload,
        loading: false,
      };
    case ADD_PLAYLIST:
      return {
        ...state,
        saving: false,
      };
    case UPDATE_PLAYLIST:
      return {
        ...state,
        saving: false,
      };
    case DELETE_PLAYLIST:
      return {
        ...state,
        saving: false,
      };
    case LOADING_PLAYLISTS:
      return {
        ...state,
        loading: true,
      };
    case SAVING_PLAYLISTS:
      return {
        ...state,
        saving: true,
      };
    case CLEAR_PLAYLISTS:
      return {
        ...state,
        playlistsList: [],
      };
    default:
      return state;
  }
};

export default playlists;
