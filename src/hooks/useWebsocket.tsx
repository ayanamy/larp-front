import type { FC } from 'react';
import { createContext, useContext, useRef } from 'react';

const WSContext = createContext<WebSocket | null>(null);

const useWebsocket = (url: string, user: string) => {
  const ws = useRef<WebSocket | null>(null);
  ws.current = new WebSocket(`${url}/${user}`);
  const WebSocketProvider: FC = (children) => (
    <WSContext.Provider value={ws.current}>{children}</WSContext.Provider>
  );
  const getWsInstance = useContext(WSContext);
  return [WebSocketProvider, getWsInstance] as const;
};
