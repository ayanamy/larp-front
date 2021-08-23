import type { FC } from 'react';
import { Button, Space, Popconfirm } from 'antd';
import type { IGamerState } from 'umi';
import { connect, useDispatch, Link } from 'umi';
import { request } from '@/utils';
import type { TGameInfo } from '@/types';
import VoteButton from './VoteButton';
import ResultButton from './ResultButton';
import FootButtons from '@/components/FootButtons';

interface IControl {
  gameInfo: TGameInfo | null;
}
const connector = ({ gamer }: { gamer: IGamerState }) => {
  return {
    gameInfo: gamer.gameInfo,
  };
};

const Control: FC<IControl> = ({ gameInfo }) => {
  const dispatch = useDispatch();
  const handleNext = async () => {
    await request(`/dm/setNextRound/${gameInfo?.id}`, {
      method: 'POST',
    });
    dispatch({
      type: 'gamer/getGameInfo',
    });
  };

  const handleClueEnableToggle = async () => {
    await request(`/dm/setClueEnableToggle/${gameInfo?.id}`, {
      method: 'POST',
    });
    dispatch({
      type: 'gamer/getGameInfo',
    });
  };

  return (
    <FootButtons>
      <Space>
        <Popconfirm title="确定要进入下一章吗？" onConfirm={handleNext}>
          <Button>进入下一章</Button>
        </Popconfirm>

        <Popconfirm
          title="确定要执行此操作吗"
          onConfirm={handleClueEnableToggle}
        >
          <Button>{gameInfo?.cluesEnable ? '关闭' : '开启'}线索</Button>
        </Popconfirm>

        <VoteButton gameId={gameInfo?.id} />
        <ResultButton />
        <Button type="link" size="small">
          <Link to="/admin">返回列表</Link>
        </Button>
      </Space>
    </FootButtons>
  );
};

export default connect(connector)(Control);
