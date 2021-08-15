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

const random = (arr: any[]) => {
  return Math.floor(Math.random() * arr.length + 1) - 1;
};

export const getRandomFromArray = (arr: any[], num: number) => {
  let newArr = Array.from(arr);
  let result = [];
  for (let i = 0; i < num; i++) {
    if (newArr.length > 0) {
      let index = random(newArr);
      result.push(newArr[index]);
      newArr.splice(index, 1);
    }
  }
  return result;
};
