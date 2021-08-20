import type { FC} from 'react';
import { useEffect, useState, useContext, useMemo, useRef } from 'react';
import {
  Button,
  Divider,
  message,
  Image,
  Row,
  Col,
  Card,
  Collapse,
  Tag,
} from 'antd';
import { PresetColorTypes } from 'antd/es/_util/colors';
import { request } from '@/utils';
import type { IGamerState } from 'umi';
import { useDispatch, connect } from 'umi';
import { getRandomFromArray } from '@/utils/common';

import ShareClues from './ShareClues';
import MyClues from './MyClues';
import { key } from 'localforage';

type TCluesPool = Pick<
  IGamerState,
  'cluesList' | 'roleId' | 'gameInfo' | 'user'
>;
const { Panel } = Collapse;
const connector = ({ gamer }: { gamer: IGamerState }) => {
  return {
    cluesList: gamer.cluesList,
    roleId: gamer.roleId,
    gameInfo: gamer.gameInfo,
    user: gamer.user,
  };
};

const CluesPool: FC<TCluesPool> = ({ cluesList, roleId, gameInfo, user }) => {
  const dispatch = useDispatch();
  const colorRef = useRef<Map<string | number, string>>(new Map());
  const getMyClues = async () => {
    dispatch({
      type: 'gamer/getMyClues',
      payload: {
        roleId,
      },
    });
  };

  const myCluesList = useMemo(() => {
    return cluesList.filter(
      (item) => item.roleId === roleId && item.status === 1,
    );
  }, [cluesList]);

  const shareCluesList = useMemo(() => {
    return cluesList.filter(
      (item) => item.roleId !== roleId || item.status === 2,
    );
  }, [cluesList]);

  const allLocation = useMemo(() => {
    return Array.from(
      new Set(
        cluesList.map(({ location }) => location).filter((item) => !!item),
      ),
    );
  }, [cluesList]);

  const allRound = useMemo(() => {
    return Array.from(
      new Set(cluesList.map(({ round }) => round).filter((item) => !!item)),
    );
  }, [cluesList]);

  const colorMap = useMemo(() => {
    const colorMap = colorRef.current;
    const allColor = Array.from(PresetColorTypes);
    const roundColor = allColor.splice(0, 5);
    const roundColorList = getRandomFromArray(roundColor, allRound.length);
    const locationColorList = getRandomFromArray(allColor, allLocation.length);
    new Array(allRound.length).fill(0).map((_, index) => {
      if (!colorMap.has(index + 1)) {
        colorMap.set(index + 1, roundColorList[index]);
      }
    });
    allLocation.map((item, index) => {
      if (!colorMap.has(item!)) {
        colorMap.set(item!, locationColorList[index]);
      }
    });
    colorRef.current = colorMap;
    return colorMap;
  }, [allLocation, allRound]);

  const ColorTags = Array.from(colorMap.entries()).map(
    ([key, value], index) => {
      const text = typeof key === 'string' ? key : `第${key}轮`;
      return (
        <Tag
          key={index}
          color={value}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {text}
        </Tag>
      );
    },
  );

  useEffect(() => {
    if (roleId) {
      getMyClues();
    }
  }, [roleId]);

  return (
    <div style={{ height: '100%' }}>
      <Card style={{ maxHeight: 'calc( 100% - 140px)', overflow: 'auto' }}>
        <div style={{ marginBottom: '4px' }}>{ColorTags}</div>
        <Collapse>
          <Panel header="我的线索" key={1}>
            <Image.PreviewGroup>
              <MyClues colorMap={colorMap} cluesList={myCluesList} />
            </Image.PreviewGroup>
          </Panel>

          <Panel header="共有线索" key={2}>
            <Image.PreviewGroup>
              <ShareClues colorMap={colorMap} cluesList={shareCluesList} />
            </Image.PreviewGroup>
          </Panel>
        </Collapse>
      </Card>
    </div>
  );
};

export default connect(connector)(CluesPool);
