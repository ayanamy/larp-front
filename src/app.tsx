import React from 'react';
import { ConfigProvider, message } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

export function rootContainer(container: React.ReactNode) {
  return React.createElement(
    ConfigProvider,
    {
      locale: zhCN,
    },
    container,
  );
}

