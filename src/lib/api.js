/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const top = `https://www.hansei-melon.com:8000/api/top-100/`;
const check = `https://www.hansei-melon.com:8000/api/apply-check/`;
const playlist = `https://www.hansei-melon.com:8000/api/music-list/`;

export const getTOP = () => axios.get(top);

export const postAPPLY = (title, album, artist) => {
  const apply = `https://www.hansei-melon.com:8000/api/apply/`;
  const headers = {
    'Authorization': 'Token 1db7a12af9fdd4a6222c0d020f7ad458ccbfe3b8',
    'Content-Type': 'application/json'
  };
  const postbody = {
    "title": title,
    "singer": artist,
    "album": album
  }
  return axios.post(apply, postbody, {'headers': headers});
}

export const getCHECK = () => axios.get(check);

export const getPLAYLIST = () => axios.get(playlist);

export const getALSearch = input => {
  const search = `https://www.hansei-melon.com:8000/api/get_music_album/?q=${input}`;
  return axios.get(search);
}

export const getTSearch = input => {
  const search = `https://www.hansei-melon.com:8000/api/get_music_title/?q=${input}`;
  return axios.get(search);
}

export const getARSearch = input => {
  const search = `https://www.hansei-melon.com:8000/api/get_music_artist/?q=${input}`;
  return axios.get(search);
}
