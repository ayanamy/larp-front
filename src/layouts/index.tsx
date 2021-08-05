import React, { useEffect } from 'react';
import { history, Helmet } from 'umi';
import localForage from 'localforage';
import { Layout } from 'antd';
import './style.less';
const { Header, Footer, Sider, Content } = Layout;
import PageHeader from './components/PageHeader';
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
        <Header>
          <PageHeader />
        </Header>
        <Content style={{ padding: '8px' }}>{children}</Content>
      </Layout>
    </>
  );
};

export default CommonLayoyt;
