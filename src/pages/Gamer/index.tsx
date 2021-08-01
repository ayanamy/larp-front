import { useEffect, FC, useRef, createContext } from 'react';
import CluesPool from './CluesPool';
import GameInfo from './GameInfo';
import { Row, Col, Empty, message } from 'antd';
import { request } from '@/utils';
import localforage from 'localforage';
import { connect, useDispatch } from 'umi';
import { GamerState } from '@/pages/models/gamer';
import { TGameInfo } from '@/types';
import React from 'react';
const connector = ({ gamer }: { gamer: GamerState }) => {
  return {
    gameInfo: gamer.gameInfo,
  };
};

interface IGamer {
  gameInfo: TGameInfo|null;
}

export const WSContext = createContext<WebSocket | null>(null);

const Gamer: FC<IGamer> = ({ gameInfo }) => {
  const ws = useRef<WebSocket | null>(null);
  const dispatch = useDispatch();
  const getCurrentGame = async () => {
    const user = await localforage.getItem('user');
    const res = await request('/game/getCurrentGame', {
      method: 'GET',
    });
    if (res.code === 200) {
      if (res?.data) {
        dispatch({
          type: 'gamer/setGameInfo',
          payload: res.data,
        });
        if ((res.data.round ?? -1) > -1) {
          getRoles(res?.data?.id);
        }
      }
    } else {
      message.warning(res.msg);
    }
  };

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


  useEffect(() => {
    getCurrentGame();
  }, []);

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
        if(msg.data==='setNextRound'){
          getCurrentGame()
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
