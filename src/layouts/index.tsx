import React, { useEffect, useState } from 'react';
import { history, Helmet, useLocation } from 'umi';
import localForage from 'localforage';
import { Layout } from 'antd';
import './style.less';
import PageHeader from './components/PageHeader';
import PageFooter from './components/PageFooter';

const { Header, Footer, Sider, Content } = Layout;
const CommonLayoyt: React.FC = ({ children }) => {
  useEffect(() => {
    (async () => {
      const user = await localForage.getItem('user');
      if (!user) {
        history.push('/login');
      } else {
      }
    })();
  }, []);

  return (
    <>
      <Helmet>
        <title>剧本杀</title>
      </Helmet>
      <Layout style={{ height: '100%' }}>
        <Header style={{ height: '50px', lineHeight: '50px' }}>
          <PageHeader />
        </Header>
        <Content
          style={{
            padding: '0 8px',
            height: 'calc(100% - 100px)',
            overflow: 'hidden',
          }}
        >
          {children}
        </Content>
        <Footer style={{ background: 'rgb(0, 21, 41)', padding: '9px' }}>
          <PageFooter />
        </Footer>
      </Layout>
    </>
  );
};

export default CommonLayoyt;
