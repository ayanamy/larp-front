import type { FC} from 'react';
import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Image, Tabs, List, Avatar, Button, message } from 'antd';
import type { IGamerState } from 'umi';
import { connect } from 'umi';
import type { TScriptInfo } from '@/types';
import { API_PREFIX } from '@/constants';

type TMyScripts = Pick<IGamerState, 'scriptsList'>;

type TScriptGroup = (readonly [number, TScriptInfo[]])[];

const connector = ({ gamer }: { gamer: IGamerState }) => {
  return {
    scriptsList: gamer.scriptsList,
  };
};

const MyScripts: FC<TMyScripts> = ({ scriptsList }) => {
  const scriptsGroup: TScriptGroup = useMemo(() => {
    const scriptMap = new Map<number, TScriptInfo[]>();
    scriptsList.map((item) => {
      const round = item.round!;
      const sm = scriptMap.get(round);
      if (sm) {
        scriptMap.set(round, [...sm, item]);
      } else {
        scriptMap.set(round, [item]);
      }
    });
    return Array.from(scriptMap.entries()).sort(
      (prev, next) => prev[0] - next[0],
    );
  }, [scriptsList]);

  return (
    <Image.PreviewGroup>
      {scriptsGroup.map(([round, list]) => {
        return (
          <Row key={round} gutter={8}>
            <Col span={24}>第{round}章</Col>
            {list.map((item) => {
              return (
                <Col span={6} key={item.id}>
                  <Image src={`${API_PREFIX}/${item.content}`} />
                </Col>
              );
            })}
          </Row>
        );
      })}
    </Image.PreviewGroup>
  );
};

export default connect(connector)(MyScripts);
