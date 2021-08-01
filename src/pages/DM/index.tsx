import React, { FC, useState, useEffect, createContext, useRef } from 'react';
import { connect, useDispatch } from 'umi';
import { request } from '@/utils';
import { GamerState } from '@/pages/models/gamer';
import { message, Row, Col, Empty } from 'antd';

import Control from './Control';

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
  }, []);

  return (
    <WSContext.Provider value={ws.current}>
      {gameInfo ? (
        <Row>
          <Col span={14}>

          </Col>
          <Col span={10}>
            <Control />
          </Col>
        </Row>
      ) : (
        <Empty description="当前没有开始剧本杀"></Empty>
      )}
    </WSContext.Provider>
  );
};

export default connect(connector)(DM);
