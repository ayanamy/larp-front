import React, { FC, useState, useEffect } from 'react';
import { GamerState } from '@/pages/models/gamer';
import { connect } from 'umi';
import { Statistic, Row, Col, Button } from 'antd';
type TGameStatistic = Pick<GamerState, 'gameInfo'>;
const { Countdown } = Statistic;
const connector = ({ gamer }: { gamer: GamerState }) => {
  return {
    gameInfo: gamer.gameInfo,
  };
};
const GameStatistic: FC<TGameStatistic> = ({ gameInfo }) => {
  useEffect(() => {}, [gameInfo?.id]);

  return (
    <Row gutter={16}>
      <Col span={8}>
        <Statistic
          title="轮次"
          value={`${gameInfo?.round}/${gameInfo?.roundTotal}`}
        />
      </Col>
      <Col span={8}>
        <Statistic title="线索数量" value={`45/60`} />
      </Col>
      <Col span={8}>
        <Statistic
          title="线索开关"
          value={gameInfo?.cluesEnable ? '已开启' : '已关闭'}
        />
      </Col>
      <Col span={8}>
        <Statistic title="其他信息" value={111} />
      </Col>
    </Row>
  );
};

export default connect(connector)(GameStatistic);
