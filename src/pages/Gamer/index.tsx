import { useEffect, FC } from 'react';
import CluesPool from './CluesPool';
import GameInfo from './GameInfo';
import { Row, Col, Empty, message } from 'antd';
import { request } from 'umi';
import localforage from 'localforage';
import { connect, useDispatch } from 'umi';
import { GamerState } from '@/pages/models/gamer';
const connector = ({ gamer }: { gamer: GamerState }) => {
  return {
    gameInfo: gamer.gameInfo,
  };
};

interface IGamer extends GamerState {}

const Gamer: FC<IGamer> = ({ gameInfo }) => {
  const dispatch = useDispatch();
  const getCurrentGame = async () => {
    const user = await localforage.getItem('user');
    const res = await request('./api/game/getCurrentGame', {
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
    const res = await request(`./api/roles/list?gameId=${gameId}`);
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

  return (
    <>
      {gameInfo ? (
        <Row style={{ height: '100%' }}>
          <Col span="14">
            <CluesPool />
          </Col>
          <Col span="10" style={{ height: '100%' }}>
            <GameInfo />
          </Col>
        </Row>
      ) : (
        <Empty description="当前没有开始剧本杀" />
      )}
    </>
  );
};

export default connect(connector)(Gamer);
