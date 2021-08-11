import React, { FC, useState, useEffect, useMemo } from 'react';
import { useLocation } from 'umi';
import GameControl from '@/pages/DM/components/GameControl';
import GamerOperation from '@/pages/Gamer/components/GamerOperation';
type TPageFooter = {};
const PageFooter: FC<TPageFooter> = (props) => {
  const location = useLocation();
  const footer = useMemo(() => {
    switch (location.pathname) {
      case '/dm':
        return <GameControl />;
      case '/gamer':
        return <GamerOperation />;
      default:
        return null;
    }
  }, [location.pathname]);
  return footer;
};

export default PageFooter;
