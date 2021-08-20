import React, { FC, useEffect, useState, useCallback } from 'react';
import {
  Modal,
  Alert,
  Button,
  Form,
  Input,
  Upload,
  message,
  Slider,
  Tabs,
} from 'antd';
import GameClues from './GameClues';
import GameRoles from './GameRoles';
import { request } from '@/utils';
import type { TRoleInfo, TClueInfo } from '@/types';

type TDetailModal = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdate?: () => void;
  gameId: number;
};
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const { TabPane } = Tabs;
const { Dragger } = Upload;
const DetailModal: FC<TDetailModal> = ({
  visible,
  setVisible,
  onUpdate,
  gameId,
}) => {
  const title = '剧本与线索';
  const onCancel = () => {
    setVisible(false);
  };
  const [rolesList, setRolesList] = useState<TRoleInfo[]>([]);
  const [cluesList, setCluesList] = useState<TClueInfo[]>([]);
  const getDetail = useCallback(async () => {
    const res = await request(`/game/detail/${gameId}`, {
      method: 'POST',
    });
    if (res.code === 200) {
      const { clues = [], game = {}, roles = [] } = res.data || {};
      setRolesList(roles);
      setCluesList(clues);
    }
  }, [gameId]);

  useEffect(() => {
    if (visible && gameId) {
      getDetail();
    }
  }, [visible, gameId]);

  const onOk = () => {};

  const initGame = async () => {
    const res = await request(`/game/initGame/${gameId}`, {
      method: 'POST',
    });
    if (res.code === 200) {
      message.success('初始化成功');
      getDetail();
    } else {
      message.warn(res.msg);
    }
  };

  return (
    <Modal
      width={1000}
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      title={title}
      maskClosable={false}
    >
      {rolesList.length === 0 && (
        <div>
          <Alert
            message="当前没有角色,你可以从导入中初始化生成"
            type="warning"
          />
          <Button onClick={initGame}>初始化角色和线索</Button>
        </div>
      )}
      <Tabs defaultActiveKey="1" onChange={() => {}}>
        <TabPane tab="角色&剧本" key="1">
          <GameRoles rolesList={rolesList} gameId={gameId} />
        </TabPane>
        <TabPane tab="线索" key="2">
          <GameClues gameId={gameId} cluesList={cluesList} />
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default DetailModal;
