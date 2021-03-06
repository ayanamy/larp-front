import type { FC} from 'react';
import React, { useState, useEffect, Children } from 'react';
import { Button } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

type TFootButtons = {
  size?: SizeType;
};
const FootButtons: FC<TFootButtons> = ({ size, children }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button.Group size={size}>{children}</Button.Group>
    </div>
  );
};

export default FootButtons;
