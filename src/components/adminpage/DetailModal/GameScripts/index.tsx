import React, { FC, useState, useEffect, useCallback } from 'react';

import {
  Modal,
  Form,
  Input,
  Upload,
  message,
  Slider,
  Tabs,
  Row,
  Col,
  Image,
} from 'antd';
import { TScriptInfo } from '@/types';
import ScriptInfo from '@/components/ScriptInfo';
import { request } from '@/utils';

type TGameClues = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdate?: () => void;
  roleId: number;
};

const GameClues: FC<TGameClues> = ({
  visible,
  setVisible,
  onUpdate,
  roleId,
}) => {
  const [scriptsList, setScriptsList] = useState<TScriptInfo[]>([]);
  const getDetail = useCallback(async () => {
    const res = await request(`/scripts/getAllScripts/${roleId}`);
    if (res.code === 200) {
      setScriptsList(res.data);
    }
  }, [roleId]);

  useEffect(() => {
    if (visible && roleId) {
      getDetail();
    }
  }, [visible, roleId]);

  const onCancel = () => {
    setVisible(false);
  };
  const onOk = () => {};
  const title = '角色剧本';
  return (
    <Modal
      width={1000}
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      title={title}
      maskClosable={false}
    >
      <Row gutter={4}>
        <Image.PreviewGroup>
          {scriptsList.map((item, index) => {
            return (
              <Col span={6} key={index}>
                <ScriptInfo {...item} />
              </Col>
            );
          })}
        </Image.PreviewGroup>
      </Row>
    </Modal>
  );
};

export default GameClues;
