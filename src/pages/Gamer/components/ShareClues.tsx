import React, { FC, useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { TClueInfo } from '@/types';
import ClueInfo from '@/components/ClueInfo';
type TShareClues = {
  cluesList: TClueInfo[];
};
const ShareClues: FC<TShareClues> = ({ cluesList }) => {
  return (
    <Row gutter={8}>
      {cluesList.map((item) => (
        <Col span={4} key={item.id}>
          <ClueInfo {...item} />
        </Col>
      ))}
    </Row>
  );
};

export default ShareClues;
