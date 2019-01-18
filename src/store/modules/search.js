import { produce } from "immer";
import { handleActions, createAction } from "redux-actions";

const INPUT = 'search/INPUT';
const SET_TIME = 'search/SET_TIME';
const START = 'search/START';

export const input = createAction(INPUT, text => text);
export const setTime = createAction(SET_TIME, (hour, min, sec) => ({ hour, min, sec}));
export const start = createAction(START);

const initialState = {
  input: '',
  placeholder: '',
  hour: null,
  min: null,
  sec: null,
  reservation: true
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
      })
  },
  initialState
);
