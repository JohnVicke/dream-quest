import http from "http";
import express from "express";
import { Server } from "socket.io";

export function createServer() {
  const app = express();
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connect", (_socket) => {
    console.log("connected");
  });
  return server;
}
