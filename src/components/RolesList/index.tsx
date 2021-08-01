import React, { FC, useState, useEffect } from 'react';
import { TRoleInfo } from '@/types';
import { Avatar, Image, Row, Col, Typography } from 'antd';
import './style.less';

const { Text } = Typography;

type TRolesList = {
  rolesList: TRoleInfo[];
  size?: 'large' | 'small';
};
const RolesList: FC<TRolesList> = ({ rolesList, size = 'large' }) => {
  return (
    <Row>
      {rolesList.map((item) => {
        return (
          <Col span={size === 'large' ? 6 : 4} key={item.id}>
            <Avatar size={40} src={<Image src={require(`@/static/1.jpg`)} />} />
            <Text>{`${item?.roleName}(${item?.user})`}</Text>
            <Text type="secondary">{item?.description}</Text>
          </Col>
        );
      })}
    </Row>
  );
};
export default RolesList;
