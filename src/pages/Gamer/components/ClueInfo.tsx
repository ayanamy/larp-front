import React, { FC, useState, useEffect, useMemo } from 'react';
import { Card, Image, Tag, Typography } from 'antd';
import { connect, IGamerState } from 'umi';
import { TClueInfo, TRoleInfo } from '@/types';
import { API_PREFIX } from '@/constants';
const { Meta } = Card;
const { Text } = Typography;
interface IClueInfo extends TClueInfo {
  actions?: React.ReactNode[] | undefined;
  showUser?: boolean;
  rolesList: TRoleInfo[];
  locationColor?: string;
  roundColor?: string;
}

const ClueInfo: FC<IClueInfo> = ({
  images,
  code,
  description,
  actions,
  location,
  roleId,
  rolesList,
  showUser,
  round,
  locationColor,
  roundColor,
}) => {
  const fromUser = useMemo(() => {
    const role = rolesList.find(({ id }) => id === roleId);
    return role?.roleName;
  }, [roleId, rolesList]);
  console.log(actions);
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <Text
          style={{ fontSize: 13, width: '60%' }}
          ellipsis={{ tooltip: code }}
        >
          {code}
        </Text>
        {actions}
      </div>
      {showUser && (
        <Text style={{ fontSize: 11 }} type="secondary">
          来自{fromUser}
        </Text>
      )}
      <div>
        <Tag color={locationColor}>{location}</Tag>
        <Tag color={roundColor}>第{round}轮</Tag>
      </div>
      <Image
        src={`${API_PREFIX}/${images}`}
        width="100%"
        style={{ maxHeight: '100%', flex: 1 }}
      />
    </div>
  );
};
export default connect(({ gamer }: { gamer: IGamerState }) => ({
  rolesList: gamer.rolesList,
}))(ClueInfo);
