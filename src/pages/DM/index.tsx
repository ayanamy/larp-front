import React, { FC, useState, useEffect, createContext, useRef } from 'react';
import { connect, useDispatch } from 'umi';
import { request } from '@/utils';
import { GamerState } from '@/pages/models/gamer';
import { message, Row, Col, Empty } from 'antd';

import RolesControl from './components/RolesControl';
import GameControl from './components/GameControl';
import Handbook from './components/Handbook';
import GameStatistic from './components/GameStatistic';
import GameIntro from '@/components/GameIntro';

interface IDM extends GamerState {}
export const WSContext = createContext<WebSocket | null>(null);
const connector = ({ gamer }: { gamer: GamerState }) => {
  return {
    gameInfo: gamer.gameInfo,
  };
};
const DM: FC<IDM> = ({ gameInfo }) => {
  const dispatch = useDispatch();
  const ws = useRef<WebSocket | null>(null);
  useEffect(() => {
    ws.current = new WebSocket(`ws://192.168.189.128:8011/webSocket/admin`);
    ws.current.onopen = function () {
      console.log('websocket已打开');
    };
    //获得消息事件
    ws.current.onmessage = function (msg) {
      var serverMsg = '收到服务端信息：' + msg.data;
      console.log(serverMsg);
    };
  });
  const getRoles = async (gameId: number) => {
    const res = await request(`/roles/list?gameId=${gameId}`);
    console.log(res);
    if (res.code === 200) {
      dispatch({
        type: 'gamer/setRolesList',
        payload: res.data,
      });
    }
  };
  const getCurrentGame = async () => {
    const res = await request('/game/getCurrentGame', {
      method: 'GET',
    });
    if (res.code === 200) {
      if (res?.data) {
        dispatch({
          type: 'gamer/setGameInfo',
          payload: res.data,
        });
        getRoles(res?.data?.id);
      }
    } else {
      message.warning(res.msg);
    }
  };
  useEffect(() => {
    getCurrentGame();
  }, [gameInfo?.id]);

  return (
    <WSContext.Provider value={ws.current}>
      {gameInfo ? (
        <Row gutter={4}>
          <Col
            span={14}
            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            <GameStatistic />
            <GameControl />
          </Col>
          <Col
            span={10}
            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            <div style={{ height: '200px', overflow: 'auto' }}>
              <GameIntro
                gameName={gameInfo.gameName ?? ''}
                description={gameInfo.description || ''}
              />
            </div>
            <div style={{ height: '300px', overflow: 'auto' }}>
              <RolesControl />
            </div>
            <div style={{ height: 'calc(100% - 500px)', overflow: 'auto' }}>
              <Handbook />
            </div>
          </Col>
        </Row>
      ) : (
        <Empty description="当前没有开始剧本杀"></Empty>
      )}
    </WSContext.Provider>
  );
};

export default connect(connector)(DM);
