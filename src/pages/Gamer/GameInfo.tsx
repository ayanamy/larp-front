import { useEffect, useState, FC } from 'react';
import { Row, Col, Image, Tabs, List, Avatar, Button, message } from 'antd';
import { connect, ConnectProps } from 'umi';
import { request } from '@/utils';
const { TabPane } = Tabs;
import { GamerState } from '@/pages/models/gamer';
import localforage from 'localforage';
import RolesList from '@/components/RolesList';
const connector = ({ gamer }: { gamer: GamerState }) => {
  return {
    gameInfo: gamer.gameInfo,
    rolesList: gamer.rolesList,
  };
};

interface IGameInfo extends GamerState {}

const GameInfo: FC<IGameInfo> = ({ gameInfo, rolesList }) => {
  const initMyRole = async () => {
    const user = await localforage.getItem('user');
    const res = await request(`/game/initMyRole/${gameInfo?.id}`, {
      method: 'POST',
      params: {
        user,
      },
    });
    if (res.code === 200) {
    } else {
    }
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
        <Row>
          <Col span={20}>
            <h3
              style={{
                width: '300px',
                fontSize: 22,
                height: 40,
                borderBottom: '4px solid #000',
              }}
            >
              剧本名称： {gameInfo?.gameName}
            </h3>
            <div>{gameInfo?.description}</div>
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
          <TabPane tab="我的" key="2"></TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default connect(connector)(GameInfo);
