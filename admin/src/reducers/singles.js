import {
  GET_SINGLES,
  LOADING_SINGLES,
  SAVING_SINGLES,
  CLEAR_SINGLES,
  DELETE_SINGLE,
  ADD_SINGLE,
  UPDATE_SINGLE,
} from '../actions/types';

const initialState = {
  singlesList: [],
  loading: false,
  saving: false,
};

const singles = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case GET_SINGLES:
      return {
        ...state,
        singlesList: payload,
        loading: false,
      };
    case ADD_SINGLE:
      return {
        ...state,
        saving: false,
      };
    case UPDATE_SINGLE:
      return {
        ...state,
        saving: false,
      };
    case DELETE_SINGLE:
      return {
        ...state,
        saving: false,
      };
    case LOADING_SINGLES:
      return {
        ...state,
        loading: true,
      };
    case SAVING_SINGLES:
      return {
        ...state,
        saving: true,
      };
    case CLEAR_SINGLES:
      return {
        ...state,
        singlesList: [],
      };
    default:
      return state;
  }
};

export default singles;
