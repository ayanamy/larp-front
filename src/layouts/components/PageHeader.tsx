import React, { FC, useState, useEffect } from 'react';
import { connect, useDispatch, history } from 'umi';
import { Dropdown, Menu, Space } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import { GamerState } from '@/pages/models/gamer';
import localForage from 'localforage';
import { confirm } from '@/utils/common';
type TPageHeader = {
  user: string | null;
};
const connector = ({ gamer }: { gamer: GamerState }) => {
  return {
    user: gamer.user,
  };
};
const PageHeader: FC<TPageHeader> = ({ user = '' }) => {
  const onMenuClick = async (event: MenuInfo) => {
    const { key } = event;
    if (key === 'logout') {
      await confirm('确定要退出吗?');
      await localForage.clear();
      history.push('/login');
    }
  };
  const UserDropdownMenu = (
    <Menu onClick={onMenuClick}>
      <Menu.Item key="logout">退出</Menu.Item>
    </Menu>
  );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        color: '#fff',
        fontSize: '1.5em',
      }}
    >
      <Space size="large">
        <div>本期主持人:张三</div>
        <Dropdown overlay={UserDropdownMenu}>
          <div>{user}</div>
        </Dropdown>
      </Space>
    </div>
  );
};

export default connect(connector)(PageHeader);
