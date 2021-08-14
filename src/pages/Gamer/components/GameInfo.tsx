import { useEffect, useState, FC } from 'react';
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
import { connect, ConnectProps, useDispatch ,IGamerState} from 'umi';
import { request } from '@/utils';
const { TabPane } = Tabs;
import localforage from 'localforage';
import RolesList from '@/components/RolesList';
import GameIntro from '@/components/GameIntro';
import MyScripts from './MyScripts';
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
      <Card>
        <GameIntro
          gameName={gameInfo?.gameName || ''}
          description={gameInfo?.description || ''}
        />
      </Card>
      <Card>
        <MyScripts />
      </Card>
    </div>
  );
};

export default connect(connector)(GameInfo);
