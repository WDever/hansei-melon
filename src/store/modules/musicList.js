import { produce } from 'immer';
import { handleActions, createAction } from 'redux-actions';

const SET_DATA = 'musicList/SET_DATA';

let id = 0;

// eslint-disable-next-line no-plusplus
export const setData = createAction(SET_DATA, (title, imgSrc) => ({ title, imgSrc, id: id++ }));

const iniitalState = {
  list: [],
};

export default handleActions(
  {
    [SET_DATA]: (state, action) =>
      produce(state, draft => {
        draft.list.push({
          id: action.payload.id,
          title: action.payload.title,
          imgSrc: action.payload.imgSrc,
        });
      }),
  },
  iniitalState,
);

