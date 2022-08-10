import {
  GET_ARTISTS,
  GET_ARTIST,
  ADD_ARTIST,
  DELETE_ARTIST,
  UPDATE_ARTIST,
  LOADING_ARTISTS,
  CLEAR_ARTISTS,
  SAVING_ARTISTS,
} from '../actions/types';

const initialState = {
  artistsList: [],
  artist: {},
  loading: false,
  saving: false,
};

const artists = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case GET_ARTISTS:
      return {
        ...state,
        artistsList: payload,
        loading: false,
      };
    case GET_ARTIST:
      return {
        ...state,
        artist: payload,
        loading: false,
      };
    case ADD_ARTIST:
      return {
        ...state,
        saving: false,
      };
    case UPDATE_ARTIST:
      return {
        ...state,
        saving: false,
      };
    case DELETE_ARTIST:
      return {
        ...state,
        saving: false,
      };
    case LOADING_ARTISTS:
      return {
        ...state,
        loading: true,
      };
    case SAVING_ARTISTS:
      return {
        ...state,
        saving: true,
      };
    case CLEAR_ARTISTS:
      return {
        ...state,
        artistsList: [],
      };
    default:
      return state;
  }
};

export default artists;
