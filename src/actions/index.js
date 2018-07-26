import * as ActionTypes from '../const/ActionTypes';

export function addTodo(text) {
  return {
    type: ActionTypes.ADD_TODO,
    text
  }
}
