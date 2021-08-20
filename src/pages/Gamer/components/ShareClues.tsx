import type { FC} from 'react';
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import type { TClueInfo } from '@/types';
import ClueInfo from './ClueInfo';
import './style.less';

type TShareClues = {
  cluesList: TClueInfo[];
  colorMap: Map<string | number, string>;
};
const ShareClues: FC<TShareClues> = ({ cluesList, colorMap }) => {
  return (
    <div className="cluesList">
      {cluesList.map((item) => {
        return (
          <ClueInfo
            roundColor={colorMap.get(item.round!)}
            locationColor={colorMap.get(item.location!)}
            showUser
            {...item}
          />
        );
      })}
    </div>
  );
};

export default ShareClues;
