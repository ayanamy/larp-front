import React, { FC, useState, useEffect } from 'react';
import { Form, Modal, Input, Button, Space, Checkbox, message } from 'antd';
import { connect } from 'umi';
import { DMState } from '../model';
type TResultButton = DMState;

const connector = ({ DM }: { DM: DMState }) => {
  return {
    voteResult: DM.voteResult,
  };
};

const ResultButton: FC<TResultButton> = ({ voteResult }) => {
  const [visible, setVisible] = useState(false);

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
        
      </Modal>
    </>
  );
};

export default connect(connector)(ResultButton);
