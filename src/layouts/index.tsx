import React, { useEffect } from 'react';
import { history } from 'umi';
import localForage from 'localforage';
const Layout: React.FC = ({ children }) => {
  useEffect(() => {
    (async () => {
      const user = await localForage.getItem('user');
      if (!user) {
        history.push('/login');
      }
    })();
  }, []);
  return <>{children}</>;
};

export default Layout;
