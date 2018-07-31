import axios from 'axios';
import * as ActionTypes from '../const/ActionTypes';

export function fetchGithubUser(userName, next) {
  next({
    type: `${ActionTypes.FETCH_GITHUB_USER}_REQ`
  });

  axios({
    method: 'GET',
    url: `https://api.github.com/users/${userName}`
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
