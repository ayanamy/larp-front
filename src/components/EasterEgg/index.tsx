import type { FC} from 'react';
import React, { useRef } from 'react';
import { BugOutlined } from '@ant-design/icons';
import { message } from 'antd';
import style from './style.less';

type TEasterEgg = {};
const EasterEgg: FC<TEasterEgg> = () => {
  const countRef = useRef(0);
  const handleClick = () => {
    if (countRef.current === 0) {
      message.success('恭喜你触发了一个小彩蛋,多点几次有惊喜(不要告诉其他人~)');
      countRef.current += 1;
      return;
    }
    countRef.current += 1;
    if (countRef.current === 10) {
      message.success('加油，再点几次');
      countRef.current = 1;
    }
  };
  return (
    <div className={style.egg}>
      <BugOutlined
        style={{ cursor: 'pointer', color: 'rgb(0, 32, 64)' }}
        onClick={handleClick}
      />
    </div>
  );
};

export default EasterEgg;
