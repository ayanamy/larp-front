import { useEffect, useState, useContext } from 'react';
import { Button, Divider, message, Image, Row, Col } from 'antd';
import { request } from '@/utils';

import { WSContext } from './index';

const CluesPool = () => {
  const [cluesList, setCluesList] = useState([]);
  const ws = useContext(WSContext);
  const getNewClues = async () => {
    // ws?.send('getNewClues');
    const res = await request('/clues/getNewClues', {
      method: 'POST',
      params: {
        roleId: 1,
      },
    });
    message.success('获取成功');
    getMyClues();
  };
  const getMyClues = async () => {
    const res = await request('/clues/getMyClues', {
      method: 'GET',
      params: {
        roleId: 1,
      },
    });
    if (res.code === 200) {
      setCluesList(res.data);
    }
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
      <Row>
        {cluesList.map((item, index) => {
          return (
            <Col span={8} key={index}>
              <Image
                width={'100%'}
                src="./201房间线索/Elaine的电子邮件.png"
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default CluesPool;
