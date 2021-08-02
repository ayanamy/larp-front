import React, { FC, useState, useEffect } from 'react';
import { connect } from 'umi';
import { GamerState } from '@/pages/models/gamer';
import { Image, Row, Col } from 'antd';
type THandbook = Pick<GamerState, 'gameInfo'>;

const connector = ({ gamer }: { gamer: GamerState }) => {
  return {
    gameInfo: gamer.gameInfo,
  };
};
const Handbook: FC<THandbook> = ({ gameInfo }) => {
  return (
    <Image.PreviewGroup>
      <Row gutter={4}>
        {new Array(10).fill(0).map((item, index) => {
          return (
            <Col span={4} key={index}>
              <Image src={`./api/组织者手册/${index + 1}.jpg`} />
            </Col>
          );
        })}
      </Row>
    </Image.PreviewGroup>
  );
};

export default connect(connector)(Handbook);