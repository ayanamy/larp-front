import { useEffect, FC, useRef, createContext } from 'react';
import CluesPool from './components/CluesPool';
import GameInfo from './components/GameInfo';
import { Row, Col, Empty, message, notification, Button,Card } from 'antd';
import { request, formatWSData } from '@/utils';
import { connect, useDispatch, Dispatch, IGamerState } from 'umi';
import { TGameInfo } from '@/types';
import EasterEgg from '@/components/EasterEgg';
import { WS_MSG_TYPE } from '@/constants';
import localforage from 'localforage';
import VoteDrawer from './components/VoteDrawer';
import RolesList from '@/components/RolesList';
const connector = ({ gamer }: { gamer: IGamerState }) => {
  return {
    gameInfo: gamer.gameInfo,
    user: gamer.user,
    roleId: gamer.roleId,
    rolesList: gamer.rolesList,
  };
};

type TGamer = Pick<IGamerState, 'gameInfo' | 'roleId' | 'user' | 'rolesList'>;

export const WSContext = createContext<WebSocket | null>(null);

const Gamer: FC<TGamer> = ({ gameInfo, user, roleId, rolesList }) => {
  const ws = useRef<WebSocket | null>(null);
  const dispatch = useDispatch();
  const getCurrentGame = async () => {
    const data = await dispatch({
      type: 'gamer/getGameInfo',
    });
    // getRoles(data?.id, user!);
    dispatch({
      type: 'gamer/getRolesList',
      payload: {
        gameId: data?.id,
        user,
      },
    });
  };
  const initMyRole = async () => {
    const res = await request(`/game/initMyRole/${gameInfo?.id}`, {
      method: 'POST',
      params: {
        user,
      },
    });
    dispatch({
      type: 'gamer/getRolesList',
      payload: {
        gameId: gameInfo?.id,
        user,
      },
    });
    message.success('初始化成功');
  };
  useEffect(() => {
    if (user) {
      getCurrentGame();
    }
  }, [user]);

  const getMyScript = async (gameId: number, rId: number) => {
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
          dispatch({
            type: 'gamer/getMyClues',
            payload: {
              roleId,
            },
          });
        }

        break;
      case WS_MSG_TYPE.START_VOTE:
        localforage.setItem('voteItem', result.data);
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
              <Card>
                {rolesList.length === 0 && (
                  <Button onClick={initMyRole}>随机我的角色</Button>
                )}
                <RolesList rolesList={rolesList} />
              </Card>
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
