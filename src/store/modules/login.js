import { produce } from 'immer';
import { handleActions, createAction } from 'redux-actions';

const IS_LOGIN = 'login/IS_LOGIN';
const SET_INFO = 'login/SET_INFO'
const JWT_TOKEN = 'login/VERIFY_TOKEN';
const COUNT = 'login/COUNT';
const COUNT_RESET= 'login/COUNT_RESET';

export const isLogin = createAction(IS_LOGIN, bool => bool);
export const setInfo = createAction(SET_INFO, (name, accessToken) => ({ name, accessToken }));
export const jwtToken = createAction(JWT_TOKEN, token => token);
export const count = createAction(COUNT);
export const countReset = createAction(COUNT_RESET);

const initialState = {
  isLogin: false,
  userInfo: {
    name: '',
    accessToken: '',
    JWTToken: '',
  },
  count: 0,
};

export default handleActions(
  {
    [IS_LOGIN]: (state, action) =>
      produce(state, draft => {
        draft.isLogin = action.payload
      }),
    [SET_INFO]: (state, action) =>
      produce(state, draft => {
        draft.userInfo.name = action.payload.name;
        draft.userInfo.accessToken = action.payload.accessToken;
      }),
    [JWT_TOKEN]: (state, action) =>
      produce(state, draft => {
        draft.userInfo.JWTToken = action.payload
      }),
    [COUNT]: (state, action) =>
      produce(state, draft => {
        draft.count += 1
      }),
    [COUNT_RESET]: (state, action) =>
      produce(state, draft => {
        draft.count = 0
      }),
  },
  initialState
);
