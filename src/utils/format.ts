import { TWSData } from '@/types';

export const formatWSData = (msg: string): TWSData => {
  let res: TWSData = JSON.parse(msg);
  return res;
};

export const buildWsData = (result: Object): string => {
  return JSON.stringify(result);
};
