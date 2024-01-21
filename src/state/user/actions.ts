import { Dispatch } from 'redux';

export const userActionTypes = {
  SET_USER: 'SET_USER',
  CLEAR_USER: 'CLEAR_USER'
};

export const updateUser = (user: any) => (dispatch: Dispatch) => {
  return dispatch({ type: userActionTypes.SET_USER, user: user });
};

export const clearUser = () => (dispatch: Dispatch) => {
  return dispatch({type: userActionTypes.CLEAR_USER})
}