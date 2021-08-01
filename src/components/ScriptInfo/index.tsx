import React, { FC, useState, useEffect } from 'react';
import { Card, Image } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
const { Meta } = Card;
import { TScriptInfo } from '@/types';

const ScriptInfo: FC<TScriptInfo> = ({ content }) => {
  return (
    <Card
      hoverable
      cover={<Image src={`./${content}`} />}
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
