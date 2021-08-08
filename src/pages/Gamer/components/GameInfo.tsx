import { useEffect, useState, FC } from 'react';
import { Row, Col, Image, Tabs, List, Avatar, Button, message } from 'antd';
import { connect, ConnectProps, useDispatch } from 'umi';
import { request } from '@/utils';
const { TabPane } = Tabs;
import { GamerState } from '@/pages/models/gamer';
import localforage from 'localforage';
import RolesList from '@/components/RolesList';
import GameIntro from '@/components/GameIntro';
import MyScripts from './MyScripts';
const connector = ({ gamer }: { gamer: GamerState }) => {
  return {
    gameInfo: gamer.gameInfo,
    rolesList: gamer.rolesList,
  };
};

type TGameInfo = Pick<GamerState, 'gameInfo' | 'rolesList'>;

const GameInfo: FC<TGameInfo> = ({ gameInfo, rolesList = [] }) => {
  const dispatch = useDispatch();
  const initMyRole = async () => {
    const user = await localforage.getItem('user');
    const res = await request(`/game/initMyRole/${gameInfo?.id}`, {
      method: 'POST',
      params: {
        user,
      },
    });
    await localforage.setItem('roleId', res.data.id);
    dispatch({
      type: 'gamer/getRolesList',
      payload: {
        gameId: gameInfo?.id,
        user,
      },
    });
    message.success('初始化成功');
  };

  return (
    <div style={{ height: '100%' }}>
      <div
        style={{
          borderBottom: '1px solid #000',
          height: '150px',
          overflowY: 'auto',
        }}
      >
        <Row gutter={4}>
          <Col span={20}>
            <GameIntro
              gameName={gameInfo?.gameName || ''}
              description={gameInfo?.description || ''}
            />
          </Col>
          <Col span={4}>
            <div
              className="user"
              style={{
                display: 'flex',
                width: '80px',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <Avatar
                size={80}
                src={<Image src={require(`@/static/1.jpg`)} />}
              />
              <div style={{ flex: 1, textAlign: 'center' }}>方木眼</div>
            </div>
          </Col>
        </Row>
      </div>
      <div style={{ overflowY: 'auto', height: 'calc( 100% - 150px )' }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="角色" key="1">
            {rolesList.length === 0 && (
              <Button onClick={initMyRole}>随机我的角色</Button>
            )}
            <RolesList rolesList={rolesList} />
          </TabPane>
          <TabPane tab="我的剧情" key="2">
            <MyScripts />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default connect(connector)(GameInfo);
