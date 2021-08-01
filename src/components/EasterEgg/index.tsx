import React, { FC, useState, useEffect } from 'react';
import { BugOutlined } from '@ant-design/icons';
import { message } from 'antd';
import style from './style.less';
type TEasterEgg = {};
const EasterEgg: FC<TEasterEgg> = () => {
  const handleClick = () => {
    message.success('恭喜你触发了一个小彩蛋');
  };
  return (
    <div className={style.egg}>
      <BugOutlined
        style={{ cursor: 'pointer', color: 'beige' }}
        onClick={handleClick}
      />
    </div>
  );
};

export default EasterEgg;
