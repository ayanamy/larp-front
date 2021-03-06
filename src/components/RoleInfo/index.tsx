import type { FC} from 'react';
import React, { useState, useEffect } from 'react';
import { Card, Image } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  FileUnknownOutlined,
} from '@ant-design/icons';
import { API_PREFIX } from '@/constants';
import type { TRoleInfo } from '@/types';

const { Meta } = Card;

interface IRoleInfo extends TRoleInfo {
  handleClick?: () => void;
}

const RoleInfo: FC<IRoleInfo> = ({
  avatar,
  roleName,
  description,
  handleClick,
}) => {
  return (
    <Card
      hoverable
      cover={<Image src={(avatar ||= `${API_PREFIX}/images/封面.jpg`)} />}
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <FileUnknownOutlined
          key="scripts"
          onClick={() => {
            console.log(1);
            handleClick?.();
          }}
        />,
        // <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta title={roleName} description={description} />
    </Card>
  );
};
export default RoleInfo;
