import { useEffect, useState, useContext, FC, useMemo, useRef } from 'react';
import {
  Button,
  Divider,
  message,
  Image,
  Row,
  Col,
  Card,
  Collapse,
} from 'antd';
import { request } from '@/utils';
import localforage from 'localforage';
import { useDispatch, connect, IGamerState } from 'umi';
import ShareClues from './ShareClues';
import MyClues from './MyClues';
type TCluesPool = Pick<
  IGamerState,
  'cluesList' | 'roleId' | 'gameInfo' | 'user'
>;
const { Panel } = Collapse;
const connector = ({ gamer }: { gamer: IGamerState }) => {
  return {
    cluesList: gamer.cluesList,
    roleId: gamer.roleId,
    gameInfo: gamer.gameInfo,
    user: gamer.user,
  };
};

const CluesPool: FC<TCluesPool> = ({ cluesList, roleId, gameInfo, user }) => {
  const dispatch = useDispatch();
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
      <Card title="线索池">
        <Collapse >
          <Panel header="我的线索" key={1}>
            <Image.PreviewGroup>
              <MyClues user={user!} roleId={roleId!} cluesList={myCluesList} />
            </Image.PreviewGroup>
          </Panel>

          <Panel header="共有线索" key={2}>
            <Image.PreviewGroup>
              <ShareClues cluesList={shareCluesList} />
            </Image.PreviewGroup>
          </Panel>
        </Collapse>
      </Card>
    </div>
  );
};

export default connect(connector)(CluesPool);
