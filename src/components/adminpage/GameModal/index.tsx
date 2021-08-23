import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Upload, message, Slider } from 'antd';
import { FileAddFilled, FileDoneOutlined } from '@ant-design/icons';
import { request } from '@/utils';
import Uploader from '@/components/Uploader';

type TGameModal = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdate?: () => void;
  gameId?: number;
};

const FormItem = Form.Item;
const { TextArea } = Input;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const { Dragger } = Upload;

const GameModal: FC<TGameModal> = ({
  visible,
  setVisible,
  onUpdate,
  gameId,
}) => {
  const [form] = Form.useForm();
  const [scripts, setScripts] = useState<any[]>([]);
  const [clues, setClues] = useState<any[]>([]);
  const [handbooks, setHandbooks] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      if (visible) {
        if (gameId) {
          const res = await request(`/game/detail?gameId=${gameId}`);
          if (res.code === 200) {
            const data = {
              ...res.data,
            };
            form.setFieldsValue(data);
          }
        } else {
          form.resetFields();
        }
      }
    })();
  }, [visible, gameId]);
  const title = gameId ? '编辑' : '新建';

  const onCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const onOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      if (values.userNum) {
        formData.append('minUser', values.userNum[0]);
        formData.append('maxUser', values.userNum[1]);
        delete values.userNum;
      }
      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value as any);
        }
      });

      Object.values(scripts).forEach((value) => {
        formData.append('scripts', value);
      });
      Object.values(clues).forEach((value) => {
        formData.append('clues', value);
      });
      Object.values(handbooks).forEach((value) => {
        formData.append('handbook', value);
      });
      const res = await request('/game/create', {
        method: 'POST',
        data: formData,
      });
      if (res.code === 200) {
        message.success('新建成功');
        setVisible(false);
        form.resetFields();
        onUpdate?.();
      } else {
        message.warn(res.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      visible={visible}
      width={500}
      onCancel={onCancel}
      onOk={onOk}
      title={title}
    >
      <Form form={form} size="small" {...layout}>
        <FormItem
          label="剧本杀名称"
          rules={[
            {
              required: true,
              message: '请填写剧本杀名称',
            },
          ]}
          name="gameName"
        >
          <Input placeholder="请填写剧本杀名称" />
        </FormItem>
        <FormItem label="人数" name="userNum">
          <Slider range max={10} min={2} />
        </FormItem>
        <FormItem
          label="每轮最多线索数"
          name="maxClues"
          rules={[
            {
              min: 1,
            },
          ]}
        >
          <Input type="number" />
        </FormItem>
        <FormItem
          label="总章节"
          name="roundTotal"
          rules={[
            {
              min: 1,
            },
          ]}
        >
          <Input type="number" />
        </FormItem>
        <FormItem label="描述" name="description" initialValue="">
          <TextArea />
        </FormItem>
        <FormItem label="导入剧本">
          <Uploader
            fileList={scripts}
            beforeUpload={(file, fileList) => {
              try {
                if (!form.getFieldValue('gameName')) {
                  let gameName = file?.webkitRelativePath ?? '';
                  [gameName] = gameName.split('/');
                  form.setFieldsValue({ gameName });
                }
              } catch (error) {}
              setScripts(fileList);
            }}
          />
        </FormItem>
        <FormItem label="导入线索">
          <Uploader fileList={clues} setFileList={setClues} />
        </FormItem>
        <FormItem label="导入组织者手册">
          <Uploader fileList={handbooks} setFileList={setHandbooks} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default GameModal;
