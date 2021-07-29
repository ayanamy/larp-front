import { ImmerReducer } from 'umi';

import type { TGameInfo, TRoleInfo } from '@/types';

export interface GamerState {
  gameInfo: TGameInfo | null;
  rolesList: TRoleInfo[];
}

export interface GamerModelType {
  namespace: 'gamer';
  state: GamerState;
  reducers: {
    setGameInfo: ImmerReducer<GamerState>;
    setRolesList: ImmerReducer<GamerState>;
  };
}

const GamerModel: GamerModelType = {
  namespace: 'gamer',
  state: {
    gameInfo: null,
    rolesList: [],
  },

  reducers: {
    setGameInfo(state, action) {
      state.gameInfo = action.payload;
    },
    setRolesList(state, action) {
      state.rolesList = action.payload;
    },
  },
};

export default GamerModel;
