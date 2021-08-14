import React, { FC, useState, useEffect } from 'react';
import { Button, Modal, Form, Radio, message } from 'antd';
import { connect, useSelector, IGamerState, useDispatch } from 'umi';
import { request } from '@/utils';
type TNewClueButton = Pick<
  IGamerState,
  'cluesLocation' | 'roleId' | 'gameInfo'
>;
const NewClueButton: FC<TNewClueButton> = ({
  cluesLocation,
  roleId,
  gameInfo,
}) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const getNewClues = async () => {
    const { location } = await form.validateFields();
    const res = await request('/clues/getNewClues', {
      method: 'POST',
      params: {
        roleId,
        location,
        gameId: gameInfo?.id,
      },
    });
    message.success('获取成功');
    setVisible(false);
    dispatch({
      type: 'gamer/getMyClues',
      payload: {
        roleId,
      },
    });
  };
  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        获取新线索
      </Button>
      <Modal
        visible={visible}
        title={'请选择搜索地点'}
        onCancel={() => setVisible(false)}
        onOk={getNewClues}
      >
        <Form form={form}>
          <Form.Item name="location" label="地点" rules={[{ required: true }]}>
            <Radio.Group>
              {cluesLocation.map((item) => (
                <Radio key={item} value={item}>
                  {item}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default connect(({ gamer }: { gamer: IGamerState }) => ({
  cluesLocation: gamer.cluesLocation,
  roleId: gamer.roleId,
  gameInfo: gamer.gameInfo,
}))(NewClueButton);
