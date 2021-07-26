import React, { FC, useEffect, useState } from 'react';
import GameModal from '../GameModal';
import DetailModal from '../DetailModal';
import { Table, Button, Space, Popconfirm, message } from 'antd';
import { ColumnType } from 'antd/es/table';
import { request } from 'umi';
import {
  EditOutlined,
  FileDoneOutlined,
  CopyOutlined,
  ExclamationCircleOutlined,
  EllipsisOutlined,
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import style from './style.less';
interface IColumn {
  id: number;
  gameName: string;
  description: string;
  maxClues: number;
  maxUser: number;
  minUser: number;
  status: number;
  dm: string;
}

const GameTable: FC<any> = (props) => {
  const columns: ColumnType<IColumn>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '游戏名称',
      dataIndex: 'gameName',
      key: 'gameName',
    },
    {
      title: '人数',
      dataIndex: 'userNum',
      key: 'userNum',
      render: (text, record) => {
        if (record.maxUser && record.minUser) {
          return `${record.minUser}~${record.maxUser}人`;
        }
        return null;
      },
    },
    {
      title: '主持人',
      dataIndex: 'dm',
      key: 'dm',
      width: 100,
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        switch (record.status) {
          case 0:
            return '未开始';
          case 1:
            return '当前';
          case -1:
            return '已完成';
          default:
            return '';
        }
      },
    },
    {
      title: '操作',
      dataIndex: 'handle',
      key: 'handle',
      width: 300,
      render: (text, record) => {
        return (
          <Space>
            <Popconfirm
              title="确定要删除吗"
              disabled={record.status !== 0}
              onConfirm={() => handleDelete(record.id)}
            >
              <Button
                size="small"
                danger
                key="delete"
                disabled={record.status !== 0}
              >
                删除
              </Button>
            </Popconfirm>

            <Button size="small" key="edit">
              编辑
            </Button>
            <Button
              size="small"
              type="primary"
              key="custom"
              onClick={() => {
                setSelectId(record.id);
                setDetailModalVisible(true);
              }}
            >
              剧本和线索
            </Button>
          </Space>
        );
      },
    },
  ];
  const [dataSource, setDataSource] = useState<IColumn[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectId, setSelectId] = useState(0);

  const handleDelete = async (gameId: number) => {
    const res = await request(`/api/game/delete/${gameId}`, {
      method: 'POST',
    });
    if (res.code === 200) {
      message.success('删除成功');
      fetchList();
    } else {
      message.warn(res.msg);
    }
  };

  const fetchList = async () => {
    let res = await request('/api/game/list', {
      method: 'GET',
    });
    if (res.code === 200) {
      setDataSource(res.data ?? []);
    }
  };
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div>
      <div className={style['table-toolbar']}>
        <div>
          <Space>
            <Button
              icon={<SearchOutlined />}
              type="primary"
              onClick={() => {
                setModalVisible(true);
              }}
            >
              新建剧本
            </Button>
          </Space>
        </div>
      </div>
      <Table rowKey="id" columns={columns} dataSource={dataSource} />
      <GameModal
        visible={modalVisible}
        setVisible={setModalVisible}
        onUpdate={() => {
          fetchList();
        }}
      />

      <DetailModal
        visible={detailModalVisible}
        setVisible={setDetailModalVisible}
        gameId={selectId}
        onUpdate={() => {
          fetchList();
        }}
      />
    </div>
  );
};

export default GameTable;
