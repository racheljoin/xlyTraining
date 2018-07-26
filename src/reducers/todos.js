import * as ActionTypes from '../const/ActionTypes';

export default function todos(state = {
  text: ''
}, action) {
  switch (action.type) {
    case ActionTypes.ADD_TODO:
      return {
        ...state,
        text: action.text
      }
    default:
      return state;
  }
}
