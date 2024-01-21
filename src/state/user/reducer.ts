import { userActionTypes } from './actions';

const initialState = {};

// Use the initialState as a default value
export default function appReducer(state = initialState, action: any) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    case userActionTypes.CLEAR_USER:
      return Object.assign({}, initialState);
    // Do something here based on the different types of actions
    case userActionTypes.SET_USER:
      return Object.assign({}, state, {
        ...action,
      });
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state;
  }
}
