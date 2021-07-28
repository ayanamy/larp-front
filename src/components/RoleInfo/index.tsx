import React, { FC, useState, useEffect } from 'react';
import { Card, Image } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  FileUnknownOutlined,
} from '@ant-design/icons';
const { Meta } = Card;
import { TRoleInfo } from '@/types';

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
      cover={<Image src={(avatar ||= './api/组织者手册/背面.jpg')} />}
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
