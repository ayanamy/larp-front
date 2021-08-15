export enum GAME_STATUS {}

export enum WS_MSG_TYPE {
  SHARE_CLUE = 'share_clue',
  OPEN_CLUE = 'open_clue',
  START_VOTE = 'start_vote',
  SET_NEXT_ROUND = 'set_next_round',
  VOTE = 'vote',
}

export const API_PREFIX = process.env.NODE_ENV === 'development' ? '/api' : '/larp';
