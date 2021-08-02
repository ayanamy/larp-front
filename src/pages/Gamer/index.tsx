import { useEffect, FC, useRef, createContext } from 'react';
import CluesPool from './components/CluesPool';
import GameInfo from './components/GameInfo';
import { Row, Col, Empty, message, notification } from 'antd';
import { request, formatWSData } from '@/utils';
import localforage from 'localforage';
import { connect, useDispatch, Dispatch } from 'umi';
import { GamerState } from '@/pages/models/gamer';
import { TGameInfo } from '@/types';
import EasterEgg from '@/components/EasterEgg';
import { WS_MSG_TYPE } from '@/constants';
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
  };

  const handleWSMessage = async (msg: string) => {
    const user = await localforage.getItem('user');
    const roleId = await localforage.getItem<number>('roleId');
    const result = formatWSData(msg);
    switch (result.type) {
      case WS_MSG_TYPE.SET_NEXT_ROUND:
        getCurrentGame();
        notification.info({
          message: '已开启下一轮',
        });
        break;
      case WS_MSG_TYPE.OPEN_CLUE:
        notification.info({
          message: '已开启线索',
        });
        break;
      case WS_MSG_TYPE.SHARE_CLUE:
        if (user !== result.from) {
          notification.info({
            message: `${result.from}分享了线索`,
          });
        }
        dispatch({
          type: 'gamer/getMyClues',
          payload: {
            roleId,
          },
        });
        break;
      default:
        break;
    }
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
      ws.current.onmessage = function (msg) {
        if (msg.data === '连接成功') {
          return;
        }
        handleWSMessage(msg.data);
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
      <EasterEgg />
    </>
  );
};

export default connect(connector)(Gamer);
