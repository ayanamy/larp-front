import { Modal } from 'antd';

export const confirm = (title: string) => {
  return new Promise((resolve, reject) => {
    Modal.confirm({
      title,
      onOk() {
        resolve(null);
      },
      onCancel() {
        reject();
      },
    });
  });
};
