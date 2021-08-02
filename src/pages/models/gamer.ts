import { ImmerReducer, Effect, Subscription } from 'umi';
import localforage from 'localforage';

import type { TGameInfo, TRoleInfo, TClueInfo, TScriptInfo } from '@/types';

import { getGameInfo, getRolesList, getMyScript, getMyClues } from '@/api';
export interface GamerState {
  gameInfo: TGameInfo | null;
  rolesList: TRoleInfo[];
  scriptsList: TScriptInfo[];
  cluesList: TClueInfo[];
  roleId: number | null;
}

export interface GamerModelType {
  namespace: 'gamer';
  state: GamerState;
  effects: {
    getGameInfo: Effect;
    getRolesList: Effect;
    getMyScript: Effect;
    getMyClues: Effect;
    getRoleId: Effect;
  };
  reducers: {
    setGameInfo: ImmerReducer<GamerState>;
    setRolesList: ImmerReducer<GamerState>;
    setScriptsList: ImmerReducer<GamerState>;
    setCluesList: ImmerReducer<GamerState>;
    setRoleId: ImmerReducer<GamerState>;
  };
  subscriptions: { setup: Subscription };
}

const GamerModel: GamerModelType = {
  namespace: 'gamer',
  state: {
    gameInfo: null,
    rolesList: [],
    scriptsList: [],
    cluesList: [],
    roleId: null,
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
    *getRoleId({}, { call, put }) {
      const roleId = yield call(localforage.getItem, 'roleId');
      yield put({
        type: 'setRoleId',
        payload: roleId,
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
    setRoleId(state, action) {
      state.roleId = action.payload;
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({
        type: 'getRoleId',
      });
    },
  },
};

export default GamerModel;
