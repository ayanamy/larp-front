import React, { FC, useEffect, useState, useCallback } from 'react';
import { Modal, Form, Input, Upload, message, Slider, Tabs } from 'antd';
import GameClues from './GameClues';
import GameScripts from './GameScripts';
import { request } from 'umi';

type TDetailModal = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdate?: () => void;
  gameId: number;
};
const FormItem = Form.Item;
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
  const [form] = Form.useForm();
  const onCancel = () => {
    form.resetFields();
    setVisible(false);
  };
  const [rolesList, setRolesList] = useState<any[]>([]);
  const getDetail = useCallback(async () => {
    const res = await request(`./api/game/detail/${gameId}`, {
      method: 'POST',
    });
    if (res.code === 200) {
      const { clues = [], game = {}, roles = [] } = res.data || {};
      setRolesList(roles);
    }
  }, [gameId]);

  useEffect(() => {
    if (visible && gameId) {
      getDetail();
    }
  }, [visible, gameId]);

  const onOk = () => {};
  return (
    <Modal
      width={800}
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      title={title}
      maskClosable={false}
    >
      <Tabs defaultActiveKey="1" onChange={() => {}}>
        <TabPane tab="剧本" key="1">
          <GameScripts rolesList={rolesList} gameId={gameId} />
        </TabPane>
        <TabPane tab="线索" key="2">
          <GameClues />
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default DetailModal;
