import React, { FC, useState, useEffect } from 'react';
import { Form, Modal, Input, Button, Space, Card, message, List } from 'antd';
import { connect } from 'umi';
import { DMState } from '../model';
import { GamerState } from '@/pages/models/gamer';
import localforage from 'localforage';

type TResultButton = DMState & Pick<GamerState, 'rolesList'>;

const connector = ({ dm, gamer }: { dm: DMState; gamer: GamerState }) => {
  return {
    voteResult: dm.voteResult,
    rolesList: gamer.rolesList,
  };
};

const ResultButton: FC<TResultButton> = ({ voteResult, rolesList }) => {
  const [visible, setVisible] = useState(false);
  const [voteItem, setVoteItem] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      if (visible) {
        const voteItem = await localforage.getItem('voteItem');
        setVoteItem(voteItem! as string[]);
      }
    })();
  }, [visible]);
  return (
    <>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        查看投票结果
      </Button>
      <Modal
        visible={visible}
        title={'查看投票结果'}
        maskClosable={false}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <List
          grid={{ gutter: 16, column: voteItem.length }}
          dataSource={voteItem}
          renderItem={(item, index) => (
            <List.Item>
              <Card title={item}>
                {voteResult.map((res) => {
                  const result = ((res.data || [])[index] || []).join(',');
                  return (
                    <div>
                      {res.from}：{result || ''}
                    </div>
                  );
                })}
              </Card>
            </List.Item>
          )}
        ></List>
      </Modal>
    </>
  );
};

export default connect(connector)(ResultButton);
