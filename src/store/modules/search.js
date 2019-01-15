import { produce } from "immer";
import { handleActions, createAction } from "redux-actions";

const INPUT = 'search/INPUT';

export const input = createAction(INPUT, text => text);

const initialState = {
  input: ''
};

export default handleActions(
  {
    [INPUT]: (state, action) =>
      produce(state, draft => {
        draft.input = action.payload
      })
  },
  initialState
);
