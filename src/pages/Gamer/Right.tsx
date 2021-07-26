import { useEffect, useState } from 'react';
import { Row, Col, Image, Tabs, List, Avatar } from 'antd';
import { request } from 'umi';
const { TabPane } = Tabs;
const Right = () => {
  const [gameInfo, setGameInfo] = useState(null);
  const [gameRoles, setGameRoles] = useState([]);
  useEffect(() => {
    (async function () {
      const res = await request('./api/game/getCurrentGame');
      if (res.code === 200) {
        setGameInfo(res.data);
      }
    })();
    (async function () {
      const res = await request('./api/roles/list?gameId=1');
      console.log(res);
      if (res.code === 200) {
        setGameRoles(res.data);
      }
    })();
  }, []);

  return (
    <div style={{ height: '100%' }}>
      <div
        style={{
          borderBottom: '1px solid #000',
          height: '150px',
          overflowY: 'auto',
        }}
      >
        <Row>
          <Col span={20}>
            <h3
              style={{
                width: '300px',
                fontSize: 22,
                height: 40,
                borderBottom: '4px solid #000',
              }}
            >
              剧本名称： {gameInfo?.gameName}
            </h3>
            <div>{gameInfo?.description}</div>
          </Col>
          <Col span={4}>
            <div
              className="user"
              style={{
                display: 'flex',
                width: '80px',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <Avatar
                size={80}
                src={<Image src={require(`@/static/1.jpg`)} />}
              />
              <div style={{ flex: 1, textAlign: 'center' }}>方木眼</div>
            </div>
          </Col>
        </Row>
      </div>
      <div style={{ overflowY: 'auto', height: 'calc( 100% - 150px )' }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="角色" key="1">
            {gameRoles.map((item) => {
              return (
                <div key={item.id} style={{ display: 'flex' }}>
                  <Avatar
                    size={40}
                    src={<Image src={require(`@/static/1.jpg`)} />}
                  />
                  <div>{`${item?.roleName}(${item?.user})`}</div>
                  <div>{item?.description}</div>
                </div>
              );
            })}
          </TabPane>
          <TabPane tab="我的" key="2">
            <Image.PreviewGroup>
              {new Array(15).fill(1).map((item, index) => {
                return (
                  <Image
                    width={'100%'}
                    key={index}
                    src={require(`@/static/me/${index + 1}.jpg`)}
                  />
                );
              })}
            </Image.PreviewGroup>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Right;
