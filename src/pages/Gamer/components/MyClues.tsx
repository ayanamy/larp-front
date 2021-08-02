import React, { FC, useState, useEffect } from 'react';
import { TClueInfo } from '@/types';
import { Row, Col, Button } from 'antd';
import ClueInfo from '@/components/ClueInfo';
import localforage from 'localforage';

import { request } from '@/utils';
type TMyClues = {
  cluesList: TClueInfo[];
};
const MyClues: FC<TMyClues> = ({ cluesList }) => {
  const shareClue = async (clueId: number) => {
    const user = await localforage.getItem('user');
    await request('/clues/share', {
      method: 'POST',
      params: {
        user,
        clueId,
      },
    });
  };
  return (
    <Row gutter={8}>
      {cluesList.map((item) => (
        <Col span={4} key={item.id}>
          <ClueInfo
            actions={[
              <Button onClick={() => shareClue(item.id)} size="small">
                分享
              </Button>,
            ]}
            {...item}
          />
        </Col>
      ))}
    </Row>
  );
};

export default MyClues;
