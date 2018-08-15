import { normalize } from 'normalizr';
import * as ActionTypes from '../const/ActionTypes';
import Schema from '../schema';

export function fetchUserInfo(mid) {
  return {
    SERVER_API: {
      type: ActionTypes.FETCH_USER_INFO,
      endpoint: '/getUserInfo',
      params: {
        mid
      }
    }
  };
}

export function changeLessonName(id) {
  return {
    type: ActionTypes.CHANGE_LESSON_NAME,
    id
  };
}

export function fetchLessonInfo(mid) {
  return {
    SERVER_API: {
      type: ActionTypes.FETCH_LESSON_INFO,
      endpoint: '/getLessonInfo',
      params: {
        mid
      },
      normalizeFuc: json => ({
        current: normalize(json.currentLessonsList, Schema.lessonListSchema),
        history: normalize(json.historyLessonsList, Schema.lessonListSchema)
      })
    }
  };
}

export function addTodo() {
  return {
    type: ActionTypes.ADD_TODO
  };
}

/* export function fetchLessonInfo(mid) {
  return {
    SERVER_API: {
      type: ActionTypes.FETCH_LESSON_INFO,
      url: 'http://xly-wkop.xiaoniangao.cn/getLessonInfo',
      param: {
        mid
      }
    }
  }
} */
