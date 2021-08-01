import React, { FC, useState, useEffect, useCallback } from 'react';
import { Alert, Button, Image, Card, Row, Col, message } from 'antd';
import type { TRoleInfo } from '@/types';

import RoleInfo from '@/components/RoleInfo';
import GameScripts from '../GameScripts';

type TGameRoles = {
  rolesList: TRoleInfo[];
  gameId: number;
};
const GameRoles: FC<TGameRoles> = ({ rolesList, gameId }) => {
  const [scriptModalVisible, setScriptModalVisible] = useState(false);
  const [selectRoleId, setSelectRoleId] = useState<number>(0);

  return (
    <div>
      <Image.PreviewGroup>
        <Row gutter={4}>
          {rolesList.map((item, index) => {
            return (
              <Col span={6} key={index}>
                <RoleInfo
                  {...item}
                  handleClick={() => {
                    setSelectRoleId(item.id);
                    setScriptModalVisible(true);
                  }}
                />
              </Col>
            );
          })}
        </Row>
      </Image.PreviewGroup>
      <GameScripts
        visible={scriptModalVisible}
        setVisible={setScriptModalVisible}
        roleId={selectRoleId}
      />
    </div>
  );
};

export default GameRoles;
