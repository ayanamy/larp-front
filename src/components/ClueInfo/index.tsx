import React, { FC, useState, useEffect } from 'react';
import { Card, Image } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
const { Meta } = Card;
import { TClueInfo } from '@/types';

const ClueInfo: FC<TClueInfo> = ({ images, code, description }) => {
  return (
    <Card
      hoverable
      cover={<Image src={`./api/${images}`} />}
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta title={code} description={description} />
    </Card>
  );
};
export default ClueInfo;
