import React, { FC, useState, useEffect, useMemo } from 'react';
import { Row, Col, Image, Tabs, List, Avatar, Button, message } from 'antd';
import { connect,IGamerState } from 'umi';
import { TScriptInfo } from '@/types';
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
      let round = item.round!;
      let sm = scriptMap.get(round);
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
                  <Image src={`./api/${item.content}`} />
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
