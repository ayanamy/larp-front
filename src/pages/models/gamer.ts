import { ImmerReducer, Effect } from 'umi';

import type { TGameInfo, TRoleInfo, TClueInfo, TScriptInfo } from '@/types';

import { getGameInfo, getRolesList, getMyScript, getMyClues } from '@/api';
export interface GamerState {
  gameInfo: TGameInfo | null;
  rolesList: TRoleInfo[];
  scriptsList: TScriptInfo[];
  cluesList: TClueInfo[];
}

export interface GamerModelType {
  namespace: 'gamer';
  state: GamerState;
  effects: {
    getGameInfo: Effect;
    getRolesList: Effect;
    getMyScript: Effect;
    getMyClues: Effect;
  };
  reducers: {
    setGameInfo: ImmerReducer<GamerState>;
    setRolesList: ImmerReducer<GamerState>;
    setScriptsList: ImmerReducer<GamerState>;
    setCluesList: ImmerReducer<GamerState>;
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
  effects: {
    *getGameInfo(_, { call, put }) {
      const res = yield call(getGameInfo);
      yield put({
        type: 'setGameInfo',
        payload: res.data,
      });
      return res.data;
    },
    *getRolesList({ payload }, { call, put }) {
      const res = yield call(getRolesList, payload);
      yield put({
        type: 'setRolesList',
        payload: res.data,
      });
    },
    *getMyScript({ payload }, { call, put }) {
      const res = yield call(getMyScript, payload);
      yield put({
        type: 'setScriptsList',
        payload: res.data,
      });
    },
    *getMyClues({ payload }, { call, put }) {
      const res = yield call(getMyClues, payload);
      yield put({
        type: 'setCluesList',
        payload: res.data,
      });
    },
  },
  reducers: {
    setGameInfo(state, action) {
      state.gameInfo = action.payload;
    },
    setRolesList(state, action) {
      state.rolesList = action.payload;
    },
    setScriptsList(state, action) {
      state.scriptsList = action.payload;
    },
    setCluesList(state, action) {
      state.cluesList = action.payload;
    },
  },
};

export default GamerModel;
