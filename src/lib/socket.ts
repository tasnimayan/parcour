// lib/socket.ts
import { io, Socket } from "socket.io-client";
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;
let socket: Socket | null = null;

export const getSocket = (token: string) => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket"], // force WS
    });
  }
  return socket;
};
