import React, { FC, useState, useEffect } from 'react';
import { Card, Image } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
const { Meta } = Card;
import { TClueInfo } from '@/types';

interface IClueInfo extends TClueInfo {
  actions?: React.ReactNode[] | undefined;
}

const ClueInfo: FC<IClueInfo> = ({ images, code, description, actions }) => {
  return (
    <Card hoverable cover={<Image src={`/api/${images}`} />} actions={actions}>
      <Meta title={code} description={description} />
    </Card>
  );
};
export default ClueInfo;
