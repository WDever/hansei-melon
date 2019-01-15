/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const url = `http://www.hansei-melon.com/api/top-100/`;

export function getTEST() {
  return axios.get(url)
};
