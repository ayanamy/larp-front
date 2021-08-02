import { TWSResult } from '@/types';

export const formatWSData = (msg: string): TWSResult => {
  let res: TWSResult = JSON.parse(msg);
  return res;
};
