import React, { FC, useState, useEffect } from 'react';
import { Form, Modal, Input, Button, Space, Checkbox, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { request } from '@/utils';
import localforage from 'localforage';
type TVoteButton = {
  gameId?: number;
};
const FormItem = Form.Item;
const VoteButton: FC<TVoteButton> = ({ gameId }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const handleVote = async () => {
    let { voteItem } = await form.validateFields();
    if (voteItem.length === 0) {
      message.warn('至少选一项投票');
      return false;
    }
    voteItem = voteItem.map(({ text }: { text: string }) => text);
    await localforage.setItem('voteItem', voteItem);
    await request(`/dm/startVote/${gameId}`, {
      method: 'POST',
      params: { voteItem },
    });
    message.success('发起成功,等待玩家投票');
  };
  return (
    <>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        发起投票
      </Button>
      <Modal
        visible={visible}
        title={'发起投票'}
        maskClosable={false}
        onOk={handleVote}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Form form={form}>
          <Form.List name="voteItem">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                  <Space
                    key={index}
                    style={{ display: 'flex', marginBottom: 8 }}
                    align="baseline"
                  >
                    <FormItem
                      label="投票标题"
                      name={[name, 'text']}
                      initialValue="你觉得凶手是谁？"
                      required
                    >
                      <Input />
                    </FormItem>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    新增选项
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </>
  );
};

export default VoteButton;
