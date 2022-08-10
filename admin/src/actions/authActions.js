import firebase from 'firebase';
import {REGISTER_SUCCESS, REGISTER_FAIL} from './types';

// Register User
export const register = ({email, password}) => async dispatch => {
  // Firebase signup here
  try {
    const user = firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: user,
    });
  } catch (error) {
    var errorMessage = error.message;
    console.log(errorMessage);
    dispatch({
      type: REGISTER_FAIL,
      payload: errorMessage,
    });
  }
};
