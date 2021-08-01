import React, { FC, useState, useEffect } from 'react';
import { TRoleInfo } from '@/types';
import { Avatar, Image, Row, Col, Typography, Card } from 'antd';
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
          <Col span={size === 'large' ? 6 : 4} key={item.id}>
            {type === 'card' ? (
              <Card
                hoverable
                style={{ width: '100%' }}
                cover={<Image src={require(`@/static/1.jpg`)} />}
              >
                <Meta
                  title={`${item?.roleName}(${item?.user})`}
                  description={item?.description}
                />
              </Card>
            ) : (
              <>
                <Avatar
                  size={100}
                  src={<Image src={require(`@/static/1.jpg`)} />}
                />
                <Row>
                  <Text>{`${item?.roleName}(${item?.user})`}</Text>
                </Row>
                <Row>
                  <Text type="secondary">{item?.description}</Text>
                </Row>
              </>
            )}
          </Col>
        );
      })}
    </Row>
  );
};
export default RolesList;
