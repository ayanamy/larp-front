import React, { FC, useState, useEffect } from 'react';
import { Typography, Row, Col } from 'antd';
const { Paragraph } = Typography;
type TGameIntro = {
  description: string;
  gameName: string;
};
const GameInfo: FC<TGameIntro> = ({ description, gameName }) => {
  return (
    <>
      <Row>
        <h3
          style={{
            width: '300px',
            fontSize: 22,
            height: 40,
            borderBottom: '4px solid #000',
          }}
        >
          {gameName}
        </h3>
      </Row>
      <Row>
        <Paragraph
          ellipsis={{
            rows: 3,
            expandable: true,
            suffix: '--剧本介绍',
          }}
          title={`剧本介绍`}
        >
          {description}
        </Paragraph>
      </Row>
    </>
  );
};

export default GameInfo;
