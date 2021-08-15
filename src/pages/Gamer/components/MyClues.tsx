import React, { FC, useState, useEffect, useMemo, useRef } from 'react';
import { TClueInfo } from '@/types';
import { Row, Col, Button, Popconfirm, message, Image, Tag } from 'antd';
import { PresetColorTypes } from 'antd/es/_util/colors';
import ClueInfo from './ClueInfo';
import localforage from 'localforage';
import { useDispatch, IGamerState, connect } from 'umi';
import { request } from '@/utils';
import { getRandomFromArray } from '@/utils/common';
import './style.less';
type TMyClues = {
  cluesList: TClueInfo[];
  roleId: number;
  user: string;
};
// todo 整体优化
const MyClues: FC<TMyClues> = ({ cluesList, roleId, user }) => {
  const dispatch = useDispatch();
  const colorRef = useRef<Map<string | number, string>>(new Map());
  const shareClue = async (clueId: number) => {
    await request('/clues/share', {
      method: 'POST',
      params: {
        user,
        clueId,
      },
    });
    message.success('分享成功');
    dispatch({
      type: 'gamer/getMyClues',
      payload: {
        roleId,
      },
    });
  };

  const ShareButton = (id: number) => {
    return (
      <Popconfirm title="确定要分享吗" onConfirm={() => shareClue(id)}>
        <Button size="small">分享</Button>
      </Popconfirm>
    );
  };

  const allLocation = useMemo(() => {
    return Array.from(
      new Set(
        cluesList.map(({ location }) => location).filter((item) => !!item),
      ),
    );
  }, [cluesList]);

  const locationColor = useMemo(() => {
    return getRandomFromArray(Array.from(PresetColorTypes), cluesList.length);
  }, [cluesList]);

  // useEffect(() => {
  //   const colorMap = new Map<string | number, string>();
  //   const allColor = Array.from(PresetColorTypes);
  //   const roundColor = allColor.splice(0, 5);
  //   console.log(allColor);
  //   console.log(roundColor);
  //   console.log(allLocation);
  //   const roundColorList = getRandomFromArray(roundColor, 5);
  //   const locationColorList = getRandomFromArray(allColor, allLocation.length);
  //   new Array(5).fill(0).map((_, index) => {
  //     if (!colorMap.has(index + 1)) {
  //       colorMap.set(index + 1, roundColorList[index]);
  //     }
  //   });
  //   allLocation.map((item, index) => {
  //     if (!colorMap.has(item!)) {
  //       colorMap.set(item!, locationColorList[index]);
  //     }
  //   });
  //   colorRef.current = colorMap;
  //   console.log(colorMap);
  // }, [allLocation]);

  const colorMap = useMemo(() => {
    const colorMap = new Map<string | number, string>();
    const allColor = Array.from(PresetColorTypes);
    const roundColor = allColor.splice(0, 5);
    console.log(allColor);
    console.log(roundColor);
    console.log(allLocation);
    const roundColorList = getRandomFromArray(roundColor, 5);
    const locationColorList = getRandomFromArray(allColor, allLocation.length);
    new Array(5).fill(0).map((_, index) => {
      if (!colorMap.has(index + 1)) {
        colorMap.set(index + 1, roundColorList[index]);
      }
    });
    allLocation.map((item, index) => {
      if (!colorMap.has(item!)) {
        colorMap.set(item!, locationColorList[index]);
      }
    });
    console.log(colorMap);
    return colorMap;
  }, [allLocation]);

  return (
    // <Row gutter={8}>
    //   {cluesList.map((item) => (
    //     <Col span={4} key={item.id}>
    //       <ClueInfo actions={[ShareButton(item.id)]} {...item} />
    //     </Col>
    //   ))}
    // </Row>
    <div className="cluesList">
      {cluesList.map((item) => {
        console.log(colorMap);
        return (
          <div
            style={{ display: 'flex', flexDirection: 'column' }}
            key={item.id}
          >
            <div>
              <Tag color={colorMap.get(item.location!)}>{item.location}</Tag>
              <Tag color={colorMap.get(item.round!)}>第{item.round}轮</Tag>
            </div>
            <div>{item.code}</div>
            <Image
              src={`/api/${item.images}`}
              width="100%"
              style={{ flex: 1 }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MyClues;
