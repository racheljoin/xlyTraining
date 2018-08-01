import axios from 'axios';
import * as ActionTypes from '../const/ActionTypes';

export function fetchGithubUser(userName, next) {
  next({
    type: `${ActionTypes.FETCH_GITHUB_USER}_REQ`
  });

  axios({
    method: 'POST',
    url: 'http://xly-wkop.xiaoniangao.cn/getUserInfo',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      mid: 111
    }
  }).then(res => {
    console.log(res);
    next({
      type: `${ActionTypes.FETCH_GITHUB_USER}_SUC`,
      data: res.data
    });
  })
  .catch(err => {
    console.log(err);
    next({
      type: `${ActionTypes.FETCH_GITHUB_USER}_FAI`
    });
  });
}
