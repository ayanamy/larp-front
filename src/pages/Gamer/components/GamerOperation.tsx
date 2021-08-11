import React, { FC, useState, useEffect } from 'react';
import FootButtons from '@/components/FootButtons';
import { request } from '@/utils';
import { TGameInfo } from '@/types';
import { GamerState } from '@/pages/models/gamer';
import { Button, message, Popconfirm, Space } from 'antd';
import { connect, useDispatch } from 'umi';

type TGamerOperation = Pick<GamerState, 'roleId' | 'gameInfo'>;

const connector = ({ gamer }: { gamer: GamerState }) => {
  return {
    gameInfo: gamer.gameInfo,
    roleId: gamer.roleId,
  };
};
const GamerOperation: FC<TGamerOperation> = ({ gameInfo, roleId }) => {
  return (
    <FootButtons>
      <Space>
        <Button type="primary">某个按钮</Button>
      </Space>
    </FootButtons>
  );
};

export default connect(connector)(GamerOperation);
