import {
  GET_ALBUMS,
  LOADING_ALBUMS,
  SAVING_ALBUMS,
  CLEAR_ALBUMS,
  ADD_ALBUM,
  UPDATE_ALBUM,
  DELETE_ALBUM,
} from '../actions/types';

const initialState = {
  albumsList: [],
  loading: false,
  saving: false,
};

const albums = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case GET_ALBUMS:
      return {
        ...state,
        albumsList: payload,
        loading: false,
      };
    case ADD_ALBUM:
      return {
        ...state,
        saving: false,
      };
    case UPDATE_ALBUM:
      return {
        ...state,
        saving: false,
      };
    case DELETE_ALBUM:
      return {
        ...state,
        saving: false,
      };
    case LOADING_ALBUMS:
      return {
        ...state,
        loading: true,
      };
    case SAVING_ALBUMS:
      return {
        ...state,
        saving: true,
      };
    case CLEAR_ALBUMS:
      return {
        ...state,
        albumsList: [],
      };
    default:
      return state;
  }
};

export default albums;
