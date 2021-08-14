import { ImmerReducer, Effect, Subscription } from 'umi';
import localforage from 'localforage';

import type { TGameInfo, TRoleInfo, TClueInfo, TScriptInfo } from '@/types';

import {
  getGameInfo,
  getRolesList,
  getMyScript,
  getMyClues,
  getLocation,
} from '@/api';
export interface IGamerState {
  gameInfo: TGameInfo | null;
  rolesList: TRoleInfo[];
  scriptsList: TScriptInfo[];
  cluesList: TClueInfo[];
  roleId: number | null;
  user: string | null;
  cluesLocation: string[];
}

export interface GamerModelType {
  namespace: 'gamer';
  state: IGamerState;
  effects: {
    getGameInfo: Effect;
    getRolesList: Effect;
    getMyScript: Effect;
    getMyClues: Effect;
    getUser: Effect;
  };
  reducers: {
    setGameInfo: ImmerReducer<IGamerState>;
    setRolesList: ImmerReducer<IGamerState>;
    setScriptsList: ImmerReducer<IGamerState>;
    setCluesList: ImmerReducer<IGamerState>;
    setRoleId: ImmerReducer<IGamerState>;
    setUser: ImmerReducer<IGamerState>;
    setCluesLocation: ImmerReducer<IGamerState>;
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
    user: null,
    cluesLocation: [],
  },
  effects: {
    *getGameInfo(_, { call, put }) {
      const { data }: { data: TGameInfo } = yield call(getGameInfo);
      yield put({
        type: 'setGameInfo',
        payload: data,
      });
      if (data.round && data.round > 0 && data.round < 999) {
        const locations = yield call(getLocation, {
          gameId: data.id,
          round: data.round,
        });
        yield put({
          type: 'setCluesLocation',
          payload: locations.data.map(
            ({ location }: { location: string }) => location,
          ),
        });
      }
      return data;
    },
    *getRolesList({ payload }, { call, put, select }) {
      const res: { data: TRoleInfo[] } = yield call(getRolesList, payload);
      const user = yield select(
        ({ gamer }: { gamer: IGamerState }) => gamer.user,
      );
      yield put({
        type: 'setRolesList',
        payload: res.data,
      });
      const currentRole = res.data.find((item) => item.user === user);
      if (currentRole) {
        yield put({
          type: 'setRoleId',
          payload: currentRole.id,
        });
      }
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
    *getUser({}, { call, put }) {
      const user = yield call(localforage.getItem, 'user');
      yield put({
        type: 'setUser',
        payload: user,
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
    setUser(state, action) {
      state.user = action.payload;
    },
    setCluesLocation(state, action) {
      state.cluesLocation = action.payload;
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({
        type: 'getUser',
      });
    },
  },
};

export default GamerModel;
