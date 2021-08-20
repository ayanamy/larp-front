import type { FC } from 'react';
import { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Image,
  Tabs,
  List,
  Avatar,
  Button,
  message,
  Card,
} from 'antd';
import type { IGamerState } from 'umi';
import { connect, ConnectProps, useDispatch } from 'umi';
import { request } from '@/utils';
import localforage from 'localforage';
import RolesList from '@/components/RolesList';
import GameIntro from '@/components/GameIntro';
import MyScripts from './MyScripts';

const { TabPane } = Tabs;

const connector = ({ gamer }: { gamer: IGamerState }) => {
  return {
    gameInfo: gamer.gameInfo,
    rolesList: gamer.rolesList,
  };
};

type TGameInfo = Pick<IGamerState, 'gameInfo' | 'rolesList'>;

const GameInfo: FC<TGameInfo> = ({ gameInfo, rolesList = [] }) => {
  const dispatch = useDispatch();

  return (
    <div style={{ height: '100%' }}>
      <Card style={{ height: '180px', overflow: 'auto' }}>
        <GameIntro
          gameName={gameInfo?.gameName || ''}
          description={gameInfo?.description || ''}
        />
      </Card>
      <Card style={{ height: 'calc( 100% - 180px)', overflow: 'auto' }}>
        <MyScripts />
      </Card>
    </div>
  );
};

export default connect(connector)(GameInfo);
