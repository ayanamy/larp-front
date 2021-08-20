import type { WS_MSG_TYPE } from '@/constants';

export type TRoleInfo = {
  avatar?: string;
  roleName: string;
  description?: string;
  id: number;
  gameId: number;
  status?: number;
  images?: string;
  user?: string;
};

enum ClueType {
  Normal = 'normal',
  Special = 'special',
}

export type TClueInfo = {
  code?: string;
  description?: string;
  id: number;
  gameId: number;
  status?: number;
  images?: string;
  roleId?: number;
  clueType?: ClueType;
  location?: string;
  round?: number;
};

export type TScriptInfo = {
  gameId: number;
  status?: number;
  roleId?: number;
  round?: number | null;
  content?: string;
  orderNo?: number;
  id: number;
};

export type TGameInfo = {
  id: number;
  gameName: string;
  description?: string;
  status?: number;
  cluesEnable?: number;
  maxClues?: number;
  round: number;
  dm?: string;
  roundTotal?: number;
  minUser?: number;
  maxUser?: number;
};

export type TRequestResult = {
  code: number;
  msg?: string;
  data?: any;
};

export type TWSData = {
  type: WS_MSG_TYPE;
  from?: string;
  to?: string;
  data?: any;
};
