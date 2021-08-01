import { useEffect, FC, useRef, createContext } from 'react';
import CluesPool from './components/CluesPool';
import GameInfo from './components/GameInfo';
import { Row, Col, Empty, message } from 'antd';
import { request } from '@/utils';
import localforage from 'localforage';
import { connect, useDispatch, Dispatch } from 'umi';
import { GamerState } from '@/pages/models/gamer';
import { TGameInfo } from '@/types';
import React from 'react';
const connector = ({ gamer }: { gamer: GamerState }) => {
  return {
    gameInfo: gamer.gameInfo,
  };
};

interface IGamer {
  gameInfo: TGameInfo | null;
  dispatch: Dispatch;
}

export const WSContext = createContext<WebSocket | null>(null);

const Gamer: FC<IGamer> = ({ gameInfo, dispatch }) => {
  const ws = useRef<WebSocket | null>(null);
  const getCurrentGame = async () => {
    const user = await localforage.getItem<string>('user');
    const data = await dispatch({
      type: 'gamer/getGameInfo',
    });
    getRoles(data?.id, user!);
  };

  const getRoles = async (gameId: number, user: string) => {
    const res = await request(`/roles/list`, {
      method: 'GET',
      params: {
        gameId,
        user,
      },
    });
    if (res.code === 200) {
      dispatch({
        type: 'gamer/setRolesList',
        payload: res.data,
      });
    }
  };

  useEffect(() => {
    getCurrentGame();
  }, []);

  const getMyScript = async () => {
    const roleId = await localforage.getItem<number>('roleId');
    const res = await dispatch({
      type: 'gamer/getMyScript',
      payload: {
        gameId: gameInfo?.id,
        roleId,
      },
    });
    console.log(res);
  };

  useEffect(() => {
    if (gameInfo?.round && gameInfo?.round > -1) {
      getMyScript();
    }
  }, [gameInfo?.round]);

  useEffect(() => {
    (async () => {
      const user = await localforage.getItem('user');
      ws.current = new WebSocket(`ws://192.168.189.128:8011/webSocket/${user}`);
      ws.current.onopen = function () {
        console.log('websocket已打开');
      };
      //获得消息事件
      ws.current.onmessage = function (msg) {
        var serverMsg = '收到服务端信息：' + msg.data;
        if (msg.data === 'setNextRound') {
          getCurrentGame();
          message.success('已开启下一轮');
        }
        console.log(serverMsg);
      };
    })();
    return ws.current?.close();
  }, []);

  return (
    <>
      {gameInfo ? (
        <WSContext.Provider value={ws.current}>
          <Row style={{ height: '100%' }}>
            <Col span="14">
              <CluesPool />
            </Col>
            <Col span="10" style={{ height: '100%' }}>
              <GameInfo />
            </Col>
          </Row>
        </WSContext.Provider>
      ) : (
        <Empty description="当前没有开始剧本杀" />
      )}
    </>
  );
};

export default connect(connector)(Gamer);
