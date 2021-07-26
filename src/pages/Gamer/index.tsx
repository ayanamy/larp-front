import Left from './Left';
import Right from './Right';
import { Row, Col } from 'antd';
export default function IndexPage() {
  return (
    <>
      <Row style={{ height: '100%' }}>
        <Col span="14">
          <Left />
        </Col>
        <Col span="10" style={{ height: '100%' }}>
          <Right />
        </Col>
      </Row>
    </>
  );
}
