import React, { FC, useState, useEffect, useMemo } from 'react';

import {
  Modal,
  Form,
  Input,
  Upload,
  message,
  Slider,
  Tabs,
  Image,
  Collapse,
  Row,
  Col,
} from 'antd';
import { TClueInfo } from '@/types';
import ClueInfo from '@/components/ClueInfo';
import { request } from '@/utils';

type TGameClues = {
  cluesList: TClueInfo[];
  gameId: number;
};

type TClueList = (readonly [number, Map<string, TClueInfo[]>])[];

const { Panel } = Collapse;

const GameClues: FC<TGameClues> = ({ cluesList }) => {
  const roundList = useMemo(() => {
    const roundSet = new Set<number>();
    cluesList.map((item) => {
      item.round && roundSet.add(item.round);
    });
    return Array.from(roundSet).sort();
  }, [cluesList]);

  const locationList = useMemo(() => {
    const locationSet = new Set<string>();
    cluesList.map((item) => {
      item.location && locationSet.add(item.location);
    });
    return Array.from(locationSet);
  }, [cluesList]);

  const clues: TClueList = useMemo(() => {
    const cluesMap = new Map<number, Map<string, TClueInfo[]>>();
    cluesList.map((item) => {
      let round = item.round || -1;
      let location = item.location || '其他';
      let roundMap = cluesMap.get(round);
      if (roundMap) {
        let locationMap = roundMap.get(location);
        if (locationMap) {
          roundMap.set(location, [...locationMap, item]);
        } else {
          roundMap.set(location, [item]);
        }
      } else {
        cluesMap.set(round, new Map([[location, [item]]]));
      }
    });
    return Array.from(cluesMap.entries());
  }, [cluesList]);

  return (
    <Collapse>
      {clues.map(([round, roundMap]) => (
        <Panel key={round} header={`第${round}轮线索`}>
          {Array.from(roundMap.entries()).map(([loc, cluesList]) => (
            <div key={loc}>
              <div>{loc}</div>
              <Row gutter={4}>
                {cluesList.map((item) => (
                  <Col key={item.id} span={6}>
                    <ClueInfo {...item} />
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Panel>
      ))}
    </Collapse>
  );
};

export default GameClues;
