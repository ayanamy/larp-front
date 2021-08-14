import { useEffect, useState, useContext, FC, useMemo, useRef } from 'react';
import { Button, Divider, message, Image, Row, Col, Card } from 'antd';
import { request } from '@/utils';
import localforage from 'localforage';
import { useDispatch, connect, IGamerState } from 'umi';
import { WSContext } from '../index';
import ShareClues from './ShareClues';
import MyClues from './MyClues';
type TCluesPool = Pick<IGamerState, 'cluesList' | 'roleId' | 'gameInfo'>;

const connector = ({ gamer }: { gamer: IGamerState }) => {
  return {
    cluesList: gamer.cluesList,
    roleId: gamer.roleId,
    gameInfo: gamer.gameInfo,
  };
};

const CluesPool: FC<TCluesPool> = ({ cluesList, roleId, gameInfo }) => {
  const dispatch = useDispatch();
  const ws = useContext(WSContext);
  const getNewClues = async () => {
    // const res = await request('/clues/getNewClues', {
    //   method: 'POST',
    //   params: {
    //     roleId,
    //   },
    // });
    // message.success('获取成功');
    // getMyClues();
  };
  const getMyClues = async () => {
    dispatch({
      type: 'gamer/getMyClues',
      payload: {
        roleId,
      },
    });
  };

  const myCluesList = useMemo(() => {
    return cluesList.filter(
      (item) => item.roleId === roleId && item.status === 1,
    );
  }, [cluesList]);

  const shareCluesList = useMemo(() => {
    return cluesList.filter(
      (item) => item.roleId !== roleId || item.status === 2,
    );
  }, [cluesList]);

  useEffect(() => {
    if (roleId) {
      getMyClues();
    }
  }, [roleId]);

  return (
    <div style={{ height: '100%' }}>
      <h1>线索池</h1>
      {/* <div>
        <Button onClick={getNewClues}>获取新线索</Button>
      </div> */}
      <Image.PreviewGroup>
        <Card title="我的线索">
          <MyClues roleId={roleId!} cluesList={myCluesList} />
        </Card>
      </Image.PreviewGroup>
      <Image.PreviewGroup>
        <Card title="已分享线索">
          <ShareClues cluesList={shareCluesList} />
        </Card>
      </Image.PreviewGroup>
    </div>
  );
};

export default connect(connector)(CluesPool);
