import React, { FC, useState, useEffect, useMemo } from 'react';
import { useLocation } from 'umi';
import GameControl from '@/pages/DM/components/GameControl';

type TPageFooter = {};
const PageFooter: FC<TPageFooter> = (props) => {
  const location = useLocation();
  const footer = useMemo(() => {
    switch (location.pathname) {
      case '/dm':
        return <GameControl />;
      default:
        return null;
    }
  }, [location.pathname]);
  return footer;
};

export default PageFooter;
