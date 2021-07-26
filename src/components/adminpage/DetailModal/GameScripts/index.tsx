import React, { FC, useState, useEffect, useCallback } from 'react';
import { Alert, Button, Image, Card, Row, Col } from 'antd';
import { request } from 'umi';

import RoleInfo from './RoleInfo';

type TGameScripts = {
  rolesList: any[];
  gameId: number;
};
const GameScripts: FC<TGameScripts> = ({ rolesList, gameId }) => {
  const initRoles = async () => {
    const res = await request(`./api/game/initRoles/${gameId}`, {
      method: 'POST',
    });
    console.log(res);
  };

  const EmptyRole = (
    <div>
      <Alert message="当前没有角色,你可以从导入中初始化生成" type="warning" />
      <Button onClick={initRoles}>初始化角色</Button>
    </div>
  );

  const RolesList = (
    <Row>
      {rolesList.map((item, index) => {
        return (
          <Col key={index}>
            <RoleInfo
              roleName={item?.roleName}
              avatar={'./api/组织者手册/背面.jpg'}
            />
          </Col>
        );
      })}
    </Row>
  );

  return <div>{rolesList.length === 0 ? EmptyRole : RolesList}</div>;
};

export default GameScripts;
