import React, { FC } from 'react';
import { Upload } from 'antd';
import type { UploadProps } from 'antd';
import type { RcFile } from 'antd/lib/upload/interface';
import { FileAddFilled, FileDoneOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
type TUploader = UploadProps & {
  fileList: RcFile[];
  setFileList?: React.Dispatch<React.SetStateAction<RcFile[]>>;
};
const Uploader: FC<TUploader> = ({ fileList, setFileList, ...restProps }) => {
  return (
    <Dragger
      directory
      fileList={fileList}
      showUploadList={false}
      beforeUpload={(file, list) => {
        setFileList?.(list);
      }}
      {...restProps}
    >
      {fileList.length > 0 ? (
        <FileDoneOutlined style={{ color: '#447CE6', fontSize: '24px' }} />
      ) : (
        <FileAddFilled style={{ color: '#447CE6', fontSize: '24px' }} />
      )}
    </Dragger>
  );
};

export default Uploader;
