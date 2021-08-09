import React, { FC, useState, useEffect } from 'react';
import { Button, Space, Popconfirm } from 'antd';
import { connect, ConnectProps, useDispatch } from 'umi';
import { request } from '@/utils';
import { GamerState } from '@/pages/models/gamer';
import { TGameInfo } from '@/types';
import VoteButton from './VoteButton';
import ResultButton from './ResultButton';
import FootButtons from '@/components/FootButtons';
interface IControl {
  gameInfo: TGameInfo | null;
}
const connector = ({ gamer }: { gamer: GamerState }) => {
  return {
    gameInfo: gamer.gameInfo,
  };
};

const Control: FC<IControl> = ({ gameInfo }) => {
  const dispatch = useDispatch();
  const handleNext = async () => {
    await request(`/dm/setNextRound/${gameInfo?.id}`, {
      method: 'POST',
    });
    dispatch({
      type: 'gamer/getGameInfo',
    });
  };

  const handleClueEnableToggle = async () => {
    await request(`/dm/setClueEnableToggle/${gameInfo?.id}`, {
      method: 'POST',
    });
    dispatch({
      type: 'gamer/getGameInfo',
    });
  };

  return (
    <FootButtons>
      <Space>
        <Popconfirm title="确定要进入下一状态吗？" onConfirm={handleNext}>
          <Button>进入下一状态</Button>
        </Popconfirm>

        <Popconfirm
          title="确定要执行此操作吗"
          onConfirm={handleClueEnableToggle}
        >
          <Button>{gameInfo?.cluesEnable ? '关闭' : '开启'}线索</Button>
        </Popconfirm>

        <VoteButton gameId={gameInfo?.id} />
        <ResultButton />
      </Space>
    </FootButtons>
  );
};

export default connect(connector)(Control);
