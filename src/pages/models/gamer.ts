import { ImmerReducer } from 'umi';

import type { TGameInfo, TRoleInfo, TClueInfo, TScriptInfo } from '@/types';

export interface GamerState {
  gameInfo: TGameInfo | null;
  rolesList: TRoleInfo[];
  scriptsList: TScriptInfo[];
  cluesList: TClueInfo[];
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
    scriptsList: [],
    cluesList: [],
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
