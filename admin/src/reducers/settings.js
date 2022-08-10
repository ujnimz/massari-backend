import {SET_THEME} from '../actions/types';

const initialState = {
  dark: false,
};

const settings = (state = initialState, action) => {
  const {type} = action;
  switch (type) {
    case SET_THEME:
      return {
        ...state,
        dark: !state.dark,
      };
    default:
      return state;
  }
};

export default settings;
