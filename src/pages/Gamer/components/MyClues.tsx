import type { FC} from 'react';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { TClueInfo } from '@/types';
import {
  Row,
  Col,
  Button,
  Popconfirm,
  message,
  Image,
  Tag,
  Tooltip,
} from 'antd';
import ClueInfo from './ClueInfo';
import { CopyTwoTone } from '@ant-design/icons';
import type { IGamerState} from 'umi';
import { useDispatch, connect } from 'umi';
import { request } from '@/utils';
import './style.less';

type TMyClues = Pick<IGamerState, 'user' | 'roleId'> & {
  cluesList: TClueInfo[];
  colorMap: Map<string | number, string>;
};
// todo 整体优化
const MyClues: FC<TMyClues> = ({ cluesList, roleId, user, colorMap }) => {
  const dispatch = useDispatch();
  const shareClue = async (clueId: number) => {
    await request('/clues/share', {
      method: 'POST',
      params: {
        user,
        clueId,
      },
    });
    message.success('分享成功');
    dispatch({
      type: 'gamer/getMyClues',
      payload: {
        roleId,
      },
    });
  };

  const ShareButton = (id: number) => {
    return (
      <Popconfirm title="确定要分享吗" onConfirm={() => shareClue(id)}>
        {/* <Button size="small">分享</Button> */}
        {/* <CopyTwoTone /> */}
        <Button size="small" type="text">
          分享
        </Button>
      </Popconfirm>
    );
  };

  return (
    <div className="cluesList">
      {cluesList.map((item) => {
        return (
          <ClueInfo
            key={item.id}
            roundColor={colorMap.get(item.round!)}
            locationColor={colorMap.get(item.location!)}
            actions={[ShareButton(item.id)]}
            {...item}
          />
        );
      })}
    </div>
  );
};

export default connect(({ gamer }: { gamer: IGamerState }) => ({
  user: gamer.user,
  roleId: gamer.roleId,
}))(MyClues);
