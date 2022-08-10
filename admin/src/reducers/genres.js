import {
  GET_GENRES,
  GET_GENRE,
  ADD_GENRE,
  DELETE_GENRE,
  UPDATE_GENRE,
  LOADING_GENRES,
  SAVING_GENRES,
  CLEAR_GENRES,
} from '../actions/types';

const initialState = {
  genresList: [],
  genre: {},
  loading: false,
  saving: false,
};

const genres = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case GET_GENRES:
      return {
        ...state,
        genresList: payload,
        loading: false,
      };
    case GET_GENRE:
      return {
        ...state,
        genre: payload,
        loading: false,
      };
    case ADD_GENRE:
      return {
        ...state,
        saving: false,
      };
    case UPDATE_GENRE:
      return {
        ...state,
        saving: false,
      };
    case DELETE_GENRE:
      return {
        ...state,
        saving: false,
      };
    case LOADING_GENRES:
      return {
        ...state,
        loading: true,
      };
    case SAVING_GENRES:
      return {
        ...state,
        saving: true,
      };
    case CLEAR_GENRES:
      return {
        ...state,
        genresList: [],
      };
    default:
      return state;
  }
};

export default genres;
