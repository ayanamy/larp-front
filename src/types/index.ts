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
