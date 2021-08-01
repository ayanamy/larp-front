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

const ResponseInterceptors = (response: Response) => {
  console.log(process.env.NODE_EN)
  console.log(response);
  if(response.status!==200){
    console.log()
  }
  return response;
};
