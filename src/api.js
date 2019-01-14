import axios from 'axios';

const url = `http://www.hansei-melon.com/api/get_top_music/`;

export function getTEST() {
  return axios.get(url)
};
