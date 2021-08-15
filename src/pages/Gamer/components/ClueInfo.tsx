import React, { FC, useState, useEffect, useMemo } from 'react';
import { Card, Image,Tag } from 'antd';
import { connect, IGamerState } from 'umi';
import { TClueInfo, TRoleInfo } from '@/types';
import { API_PREFIX } from '@/constants';
const { Meta } = Card;

interface IClueInfo extends TClueInfo {
  actions?: React.ReactNode[] | undefined;
  showUser?: boolean;
  rolesList: TRoleInfo[];
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
}) => {
  const fromUser = useMemo(() => {
    const role = rolesList.find(({ id }) => id === roleId);
    return role?.roleName;
  }, [roleId, rolesList]);

  return (
    // <Card
    //   hoverable
    //   cover={<Image src={`${API_PREFIX}/${images}`} />}
    //   actions={actions}
    // >
    //   <Meta title={code} description={description} />
    // </Card>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Image
        src={`${API_PREFIX}/${images}`}
        width="100%"
        style={{ maxHeight: '100%' }}
      />
      <div>{code}</div>
      <div><Tag>{location}</Tag><Tag>第{location}</Tag>轮</div>
      {showUser && <div>来自{fromUser}</div>}
    </div>
  );
};
export default connect(({ gamer }: { gamer: IGamerState }) => ({
  rolesList: gamer.rolesList,
}))(ClueInfo);
