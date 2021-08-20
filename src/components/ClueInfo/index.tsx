import type { FC} from 'react';
import React, { useState, useEffect } from 'react';
import { Card, Image } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { TClueInfo } from '@/types';
import { API_PREFIX } from '@/constants';

const { Meta } = Card;

interface IClueInfo extends TClueInfo {
  actions?: React.ReactNode[] | undefined;
}

const ClueInfo: FC<IClueInfo> = ({
  images,
  code,
  description,
  actions,
  location,
}) => {
  return (
    <Card
      hoverable
      cover={<Image src={`${API_PREFIX}/${images}`} />}
      actions={actions}
    >
      <Meta title={code} description={description} />
    </Card>
  );
};
export default ClueInfo;
