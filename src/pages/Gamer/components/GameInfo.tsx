import type { FC } from 'react';
import { Card } from 'antd';
import type { IGamerState } from 'umi';
import { connect } from 'umi';
import GameIntro from '@/components/GameIntro';
import MyScripts from './MyScripts';

const connector = ({ gamer }: { gamer: IGamerState }) => {
  return {
    gameInfo: gamer.gameInfo,
    rolesList: gamer.rolesList,
  };
};

type TGameInfo = Pick<IGamerState, 'gameInfo' | 'rolesList'>;

const GameInfo: FC<TGameInfo> = ({ gameInfo }) => {
  return (
    <div style={{ height: '100%' }}>
      <Card style={{ height: '180px', overflow: 'auto' }}>
        <GameIntro
          gameName={gameInfo?.gameName || ''}
          description={gameInfo?.description || ''}
        />
      </Card>
      <Card style={{ height: 'calc( 100% - 180px)', overflow: 'auto' }}>
        <MyScripts />
      </Card>
    </div>
  );
};

export default connect(connector)(GameInfo);
