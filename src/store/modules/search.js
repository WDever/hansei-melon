import { produce } from "immer";
import { handleActions, createAction } from "redux-actions";

const INPUT = 'search/INPUT';
const SET_TIME = 'search/SET_TIME';
const START = 'search/START';
const END = 'search/END';
const T_SEARCH = 'search/T_SEARCH';
const AL_SEARCH = 'search/AL_SEARCH';
const AR_SEARCH = 'search/AR_SEARCH';
const CAT = 'search/CAT';
const SEARCH_LOADING = 'search/SEARCH_LOADING';

let id = 0;

export const input = createAction(INPUT, text => text);
export const setTime = createAction(SET_TIME, (hour, min, sec) => ({ hour, min, sec}));
export const start = createAction(START);
export const end = createAction(END);
// eslint-disable-next-line no-plusplus
export const Tsearch = createAction(T_SEARCH, (title, imgSrc, album, artist) => ({title, imgSrc, album, artist, id: id++}));
// eslint-disable-next-line no-plusplus
export const Alsearch = createAction(AL_SEARCH, (title, imgSrc, album, artist) => ({title, imgSrc, album, artist, id: id++}));
// eslint-disable-next-line no-plusplus
export const Arsearch = createAction(AR_SEARCH, (title, imgSrc, album, artist) => ({title, imgSrc, album, artist, id: id++}));
export const cat = createAction(CAT, index => index);
export const searchLoading = createAction(SEARCH_LOADING);

const initialState = {
  input: '',
  placeholder: '',
  hour: null,
  min: null,
  sec: null,
  reservation: true,
  flag: false,
  cat: 1,
  Tlist: [],
  Allist: [],
  Arlist: [],
  loading: false,
};

export default handleActions(
  {
    [INPUT]: (state, action) =>
      produce(state, draft => {
        draft.input = action.payload
      }),
    [SET_TIME]: (state, action) =>
      produce(state, draft => {
        draft.hour = action.payload.hour;
        draft.min = action.payload.min;
        draft.sec = action.payload.sec;
        draft.placeholder = `예약시간 전입니다.- ${action.payload.hour} : ${action.payload.min} : ${action.payload.sec}`;
      }),
    [START]: (state, action) =>
      produce(state, draft => {
        draft.reservation = !state.reservation;
      }),
    [END]: (state, action) =>
      produce(state, draft => {
        draft.placeholder = `오늘의 예약이 마감되었습니다.`
      }),
    [T_SEARCH]: (state, action) =>
      produce(state, draft =>{
        draft.flag = !action.flag;
        draft.Tlist.push({
          id: action.payload.id,
          title: action.payload.title,
          imgSrc: action.payload.imgSrc,
          album: action.payload.album,
          artist: action.payload.artist
        });
      }),
    [AL_SEARCH]: (state, action) =>
      produce(state, draft => {
        draft.Allist.push({
          id: action.payload.id,
          title: action.payload.title,
          imgSrc: action.payload.imgSrc,
          album: action.payload.album,
          artist: action.payload.artist
        });
      }),
    [AR_SEARCH]: (state, action) =>
      produce(state, draft => {
        draft.Arlist.push({
          id: action.payload.id,
          title: action.payload.title,
          imgSrc: action.payload.imgSrc,
          album: action.payload.album,
          artist: action.payload.artist
        });
      }),
    [CAT]: (state, action) =>
      produce(state, draft => {
        draft.cat = action.payload
      }),
    [SEARCH_LOADING]: (state, action) =>
      produce(state, draft => {
        draft.loading = !state.loading
      }),
  },
  initialState
);
