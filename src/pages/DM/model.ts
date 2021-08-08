import { ImmerReducer, Effect } from 'umi';
import { TWSData } from '@/types';
export interface DMState {
  voteResult: TWSData[];
}

export interface DMModelType {
  namespace: 'dm';
  state: DMState;

  reducers: {
    setVoteResult: ImmerReducer<DMState>;
  };
}

const DMModel: DMModelType = {
  namespace: 'dm',
  state: {
    voteResult: [],
  },
  reducers: {
    setVoteResult(state, action) {
      const data = action.payload as TWSData;
      const index = state.voteResult.findIndex(({ from }) => from === data.from);
      if (index > -1) {
        state.voteResult[index] = data;
      } else {
        state.voteResult.push(data);
      }
    },
  },
};

export default DMModel;
