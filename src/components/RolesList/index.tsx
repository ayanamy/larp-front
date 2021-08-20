import type { FC} from 'react';
import React, { useState, useEffect } from 'react';
import type { TRoleInfo } from '@/types';
import { Avatar, Image, Row, Col, Typography, Card } from 'antd';
import { API_PREFIX } from '@/constants';
import './style.less';

const { Meta } = Card;
const { Text } = Typography;

type TRolesList = {
  rolesList: TRoleInfo[];
  size?: 'large' | 'small';
  type?: 'card' | 'avatar';
};
const RolesList: FC<TRolesList> = ({
  rolesList,
  size = 'large',
  type = 'card',
}) => {
  return (
    <Row gutter={8}>
      {rolesList.map((item) => {
        return (
          <Col flex={1} key={item.id}>
            <Avatar
              shape="circle"
              size={60}
              src={<Image src={`${API_PREFIX}/images/1.jpg`} />}
            />
            <Row>
              <Text>{`${item?.roleName}(${item?.user})`}</Text>
            </Row>
            <Row>
              <Text type="secondary">{item?.description}</Text>
            </Row>
          </Col>
        );
      })}
    </Row>
  );
};
export default RolesList;
