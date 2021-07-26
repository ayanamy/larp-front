import React, { FC, useState, useEffect } from 'react';
import { Card } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
const { Meta } = Card;
type TRoleInfo = {
  avatar?: string;
  roleName: string;
  description?: string;
};
const RoleInfo: FC<TRoleInfo> = ({ avatar, roleName, description }) => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="角色" src={avatar} />}
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta title={roleName} description={description} />
    </Card>
  );
};

export default RoleInfo;
