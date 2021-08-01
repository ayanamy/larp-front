import { useEffect, useState, useContext, FC } from 'react';
import { Button, Divider, message, Image, Row, Col } from 'antd';
import { request } from '@/utils';
import localforage from 'localforage';
import { useDispatch, connect } from 'umi';
import { WSContext } from '../index';
import { GamerState } from '@/pages/models/gamer';

type TCluesPool = Pick<GamerState, 'cluesList'>;

const connector = ({ gamer }: { gamer: GamerState }) => {
  return {
    cluesList: gamer.cluesList,
  };
};

const CluesPool: FC<TCluesPool> = ({ cluesList }) => {
  const dispatch = useDispatch();
  const ws = useContext(WSContext);
  const getNewClues = async () => {
    // ws?.send('getNewClues');
    const roleId = await localforage.getItem<number>('roleId');
    const res = await request('/clues/getNewClues', {
      method: 'POST',
      params: {
        roleId,
      },
    });
    message.success('获取成功');
    getMyClues();
  };
  const getMyClues = async () => {
    const roleId = await localforage.getItem<number>('roleId');
    dispatch({
      type: 'gamer/getMyClues',
      payload: {
        roleId,
      },
    });
  };
  useEffect(() => {
    getMyClues();
  }, []);

  return (
    <div style={{ borderRight: '1px solid #000', height: '100%' }}>
      <h1>线索池</h1>
      <Divider />
      <div>
        <Button onClick={getNewClues}>获取线索</Button>
      </div>
      <Row gutter={4}>
        <Image.PreviewGroup>
          {cluesList.map((item, index) => {
            return (
              <Col span={8} key={index}>
                <Image width={'100%'} src={`./api/${item.images}`} />
              </Col>
            );
          })}
        </Image.PreviewGroup>
      </Row>
    </div>
  );
};

export default connect(connector)(CluesPool);
