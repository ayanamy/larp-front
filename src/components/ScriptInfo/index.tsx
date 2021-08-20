import type { FC} from 'react';
import React, { useState, useEffect } from 'react';
import { Card, Image } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { API_PREFIX } from '@/constants';
import type { TScriptInfo } from '@/types';

const { Meta } = Card;

const ScriptInfo: FC<TScriptInfo> = ({ content }) => {
  return (
    <Card
      hoverable
      cover={<Image src={`${API_PREFIX}/${content}`} />}
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      {/* <Meta title={roleName} description={description} /> */}
    </Card>
  );
};
export default ScriptInfo;
