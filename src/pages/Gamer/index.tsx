import { useEffect, FC, useRef, createContext } from 'react';
import CluesPool from './components/CluesPool';
import GameInfo from './components/GameInfo';
import { Row, Col, Empty, message, notification } from 'antd';
import { request, formatWSData } from '@/utils';
import { connect, useDispatch, Dispatch } from 'umi';
import { GamerState } from '@/pages/models/gamer';
import { TGameInfo } from '@/types';
import EasterEgg from '@/components/EasterEgg';
import { WS_MSG_TYPE } from '@/constants';
import localforage from 'localforage';
import VoteDrawer from './components/VoteDrawer';
const connector = ({ gamer }: { gamer: GamerState }) => {
  return {
    gameInfo: gamer.gameInfo,
    user: gamer.user,
    roleId: gamer.roleId,
  };
};

interface IGamer {
  gameInfo: TGameInfo | null;
  user: string | null;
  roleId: number | null;
  dispatch: Dispatch;
}

export const WSContext = createContext<WebSocket | null>(null);

const Gamer: FC<IGamer> = ({ gameInfo, dispatch, user, roleId }) => {
  const ws = useRef<WebSocket | null>(null);
  const getCurrentGame = async () => {
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
      if (!roleId) {
        let currentRole = res.data.find((item: any) => item.user === user);
        console.log(currentRole);
        if (currentRole) {
          await localforage.setItem('roleId', currentRole.id);
          dispatch({
            type: 'gamer/getRoleId',
          });
        }
      }
    }
  };

  useEffect(() => {
    getCurrentGame();
  }, []);

  const getMyScript = async (gameId: number, rId: number) => {
    console.log(gameInfo?.id);
    const res = await dispatch({
      type: 'gamer/getMyScript',
      payload: {
        gameId,
        roleId: rId,
      },
    });
  };

  const handleWSMessage = async (msg: string) => {
    const result = formatWSData(msg);
    switch (result.type) {
      case WS_MSG_TYPE.SET_NEXT_ROUND:
        await getCurrentGame();
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
      case WS_MSG_TYPE.START_VOTE:
        localforage.setItem('voteItem',result.data)
        await dispatch({
          type: 'gamer/getGameInfo',
        });
      default:
        break;
    }
  };

  useEffect(() => {
    if (gameInfo?.round && gameInfo?.round > -1 && roleId && gameInfo?.id) {
      getMyScript(gameInfo.id, roleId);
    }
  }, [gameInfo?.round, gameInfo?.id, roleId]);

  useEffect(() => {
    (async () => {
      const uu = await localforage.getItem('user');
      ws.current = new WebSocket(`ws://192.168.189.128:8011/webSocket/${uu}`);
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
          <VoteDrawer />
        </WSContext.Provider>
      ) : (
        <Empty description="当前没有开始剧本杀" />
      )}
      <EasterEgg />
    </>
  );
};

export default connect(connector)(Gamer);
