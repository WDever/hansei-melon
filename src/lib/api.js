/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const top = `https://www.hansei-melon.com/api/top-100/`;
const check = `https://www.hansei-melon.com/api/apply-check/`;
const playlist = `https://www.hansei-melon.com/api/music-list/`;

export const getTOP = () => axios.get(top);

export const postAPLLY = (title, album, artist) => {
  const apply = `https://www.hansei-melon.com/api/apply/?title=${title}&album=${album}&singer=${artist}`;
  console.log(title, album, artist);
  const headers = {
    'Authorization': 'Token 1db7a12af9fdd4a6222c0d020f7ad458ccbfe3b8',
    'Content-Type': 'application/json'
  }
  return axios.post(apply, {}, {'headers': headers});
}

export const getCHECK = () => axios.get(check);

export const getPLAYLIST = () => axios.get(playlist);
