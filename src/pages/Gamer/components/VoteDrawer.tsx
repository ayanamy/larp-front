import React, { FC, useState, useEffect, useMemo, useContext } from 'react';
import { Drawer, Button, Form, Select, Popconfirm, Divider } from 'antd';
import { connect } from 'umi';
import localforage from 'localforage';
import { GamerState } from '@/pages/models/gamer';
import { WSContext } from '../index';
import { TWSData } from '@/types';
import { buildWsData } from '@/utils/format';
import { WS_MSG_TYPE } from '@/constants';
type TVoteDrawer = Pick<GamerState, 'rolesList' | 'gameInfo' | 'user'>;
const { Option } = Select;
const connector = ({ gamer }: { gamer: GamerState }) => {
  return {
    gameInfo: gamer.gameInfo,
    rolesList: gamer.rolesList,
    user: gamer.user,
  };
};

const VoteDrawer: FC<TVoteDrawer> = ({ gameInfo, rolesList, user }) => {
  const [voteItems, setVoteItems] = useState<any>([]);
  const [form] = Form.useForm();
  const ws = useContext(WSContext);
  useEffect(() => {
    (async () => {
      if (gameInfo?.round === 999) {
        const voteItem = await localforage.getItem('voteItem');
        setVoteItems(voteItem || []);
      }
    })();
  }, [gameInfo?.round]);
  const handleVote = async () => {
    const { result } = await form.validateFields();
    const sendObj: TWSData = {
      type: WS_MSG_TYPE.VOTE,
      data: result,
      to: 'admin',
      from: user!,
    };
    ws?.send(buildWsData(sendObj));
  };
  return (
    <Drawer visible={gameInfo?.round === 999} width={300}>
      <Divider />
      <Form form={form} size="small">
        {voteItems.map((item: any, index: number) => (
          <Form.Item key={index} label={item} name={['result', index]}>
            <Select mode="multiple">
              {rolesList.map((role) => (
                <Option value={role.roleName} key={role.id}>
                  {role.roleName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        ))}
        <Form.Item>
          <Popconfirm title="确定要投票吗" onConfirm={handleVote}>
            <Button type="primary" block>
              投票
            </Button>
          </Popconfirm>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default connect(connector)(VoteDrawer);
