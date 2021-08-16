import React, { FC, useState, useEffect } from 'react';
import FootButtons from '@/components/FootButtons';
import { request } from '@/utils';
import { TGameInfo } from '@/types';
import { Button, message, Popconfirm, Space } from 'antd';
import { connect, useDispatch, IGamerState } from 'umi';
import NewClueButton from './NewClueButton';
type TGamerOperation = Pick<IGamerState, 'roleId' | 'gameInfo'>;

const connector = ({ gamer }: { gamer: IGamerState }) => {
  return {
    gameInfo: gamer.gameInfo,
    roleId: gamer.roleId,
  };
};
const GamerOperation: FC<TGamerOperation> = ({ gameInfo, roleId }) => {
  return (
    <FootButtons>
      <Space>
        <NewClueButton />
        <Button
          onClick={() => {
            message.info('功能未完成！自己喊一下！');
          }}
        >
          呼叫帮助
        </Button>
      </Space>
    </FootButtons>
  );
};

export default connect(connector)(GamerOperation);
