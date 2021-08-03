import React, { FC, useState, useEffect } from 'react';
import { TClueInfo } from '@/types';
import { Row, Col, Button, Popconfirm } from 'antd';
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

  const ShareButton = (id: number) => {
    return (
      <Popconfirm title="确定要分享吗" onConfirm={() => shareClue(id)}>
        <Button size="small">分享</Button>
      </Popconfirm>
    );
  };

  return (
    <Row gutter={8}>
      {cluesList.map((item) => (
        <Col span={4} key={item.id}>
          <ClueInfo actions={[ShareButton(item.id)]} {...item} />
        </Col>
      ))}
    </Row>
  );
};

export default MyClues;
