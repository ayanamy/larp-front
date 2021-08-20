import type { TWSData } from '@/types';

export const formatWSData = (msg: string): TWSData => {
  const res: TWSData = JSON.parse(msg);
  return res;
};

export const buildWsData = (result: Object): string => {
  return JSON.stringify(result);
};
