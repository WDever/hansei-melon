/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const top = `https://www.hansei-melon.com/api/top-100/`;

export const getTOP = () => axios.get(top);

export const getAPLLY = (title, album, artist) => {
  const apply = `https://www.hansei-melon.com/api/apply/?title=${title}&album=${album}&singer=${artist}`;
  console.log(title, album, artist);
  console.log(apply);
  const headers = {
    'Authorization': 'Token 1db7a12af9fdd4a6222c0d020f7ad458ccbfe3b8',
    'Content-Type': 'application/json'
  }
  return axios.post(apply, {}, {'headers': headers});
}
