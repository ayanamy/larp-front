import request from '@/utils/request';

export const getGameInfo = async () => {
  return await request('/game/getCurrentGame', {
    method: 'GET',
  });
};

export const getRolesList = async (params: any) => {
  return await request('/roles/list', {
    method: 'GET',
    params,
  });
};

export const getMyScript = async (params: any) => {
  return await request('/scripts/getScripts', {
    method: 'GET',
    params,
  });
};

export const getMyClues = async (params: any) => {
  return await request('/clues/getMyClues', {
    method: 'GET',
    params,
  });
};


export const getLocation = async (params: any) => {
  return await request('/clues/getLocation', {
    method: 'GET',
    params,
  });
};
