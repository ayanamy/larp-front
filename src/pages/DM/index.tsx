import type { FC} from 'react';
import React, { useState, useEffect, createContext, useRef } from 'react';
import type { IGamerState } from 'umi';
import { connect, useDispatch } from 'umi';
import { request, formatWSData } from '@/utils';
import { message, Row, Col, Empty, Card } from 'antd';

import RolesControl from './components/RolesControl';
import GameControl from './components/GameControl';
import Handbook from './components/Handbook';
import GameStatistic from './components/GameStatistic';
import GameIntro from '@/components/GameIntro';
import { WS_MSG_TYPE, WS_URL } from '@/constants';

type IDM = IGamerState
export const WSContext = createContext<WebSocket | null>(null);
const connector = ({ gamer }: { gamer: IGamerState }) => {
  return {
    gameInfo: gamer.gameInfo,
  };
};
const DM: FC<IDM> = ({ gameInfo }) => {
  const dispatch = useDispatch();
  const ws = useRef<WebSocket | null>(null);
  const handleWSMessage = (msg: string) => {
    const result = formatWSData(msg);
    switch (result.type) {
      case WS_MSG_TYPE.VOTE:
        dispatch({
          type: 'dm/setVoteResult',
          payload: result,
        });
        break;
    }
  };
  useEffect(() => {
    ws.current = new WebSocket(`${WS_URL}/webSocket/admin`);
    ws.current.onopen = function () {
      console.log('websocket已打开');
    };
    // 获得消息事件
    ws.current.onmessage = function (msg) {
      const serverMsg = `收到服务端信息：${  msg.data}`;
      console.log(serverMsg);
      if (msg.data === '连接成功') {
        return;
      }
      handleWSMessage(msg.data);
    };
  }, []);
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
            <Card>
              <GameStatistic />
            </Card>
            {/* <GameControl /> */}
          </Col>
          <Col
            span={10}
            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            <div style={{ height: '200px', overflow: 'auto' }}>
              <Card>
                <GameIntro
                  gameName={gameInfo.gameName ?? ''}
                  description={gameInfo.description || ''}
                />
              </Card>
            </div>
            <div style={{ height: '300px', overflow: 'auto' }}>
              <Card>
                <RolesControl />
              </Card>
            </div>
            <div style={{ height: 'calc(100% - 500px)', overflow: 'auto' }}>
              <Card>
                <Handbook />
              </Card>
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
