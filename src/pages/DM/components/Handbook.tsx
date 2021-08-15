import React, { FC, useState, useEffect } from 'react';
import { connect, IGamerState } from 'umi';
import { Image, Row, Col } from 'antd';
import { request } from '@/utils';
import { API_PREFIX } from '@/constants';
type THandbook = Pick<IGamerState, 'gameInfo'>;

const connector = ({ gamer }: { gamer: IGamerState }) => {
  return {
    gameInfo: gamer.gameInfo,
  };
};
const Handbook: FC<THandbook> = ({ gameInfo }) => {
  const [handbooks, setHandbooks] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      if (gameInfo?.id) {
        const res = await request(`/dm/getHandBook/${gameInfo.id}`);
        console.log(res);
        setHandbooks(res?.data as string[]);
      }
    })();
  }, [gameInfo?.id]);
  return (
    <Image.PreviewGroup>
      <Row gutter={4}>
        {handbooks.map((item, index) => {
          return (
            <Col span={4} key={index}>
              <Image src={`${API_PREFIX}/${item}`} />
            </Col>
          );
        })}
      </Row>
    </Image.PreviewGroup>
  );
};

export default connect(connector)(Handbook);
