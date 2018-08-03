import * as ActionTypes from '../const/ActionTypes';

export default function lessons(state = {
  currentLessonIds: [],
  historyLessonIds: [],
  lessonEntities: {}
}, action) {
  switch (action.type) {
    case `${ActionTypes.FETCH_LESSON_INFO}_SUC`:
      console.log(action);
      return {
        ...state,
        lessonEntities: {
          ...state.lessonEntities,
          ...action.response.current.entities.lesson,
          ...action.response.history.entities.lesson
        },
        currentLessonIds: action.response.current.result,
        historyLessonIds: action.response.history.result,
      }
    case ActionTypes.CHANGE_LESSON_NAME: {
      // const _lessonEntities = { ...state.lessonEntities };

      // _lessonEntities[action.id] = {
      //   ...state.lessonEntities[action.id],
      //   beCommenttedRate: state.lessonEntities[action.id].beCommenttedRate + 's'
      // }
      // return {
      //   ...state,
      //   lessonEntities: _lessonEntities
      // }
      const _curIds = state.currentLessonIds;
      _curIds.shift();
      return {
        ...state,
        currentLessonIds: _curIds
      }
    }
    default:
      return state;
  }
}
