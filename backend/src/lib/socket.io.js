import { Server } from "socket.io";
import http from 'http'
import express from 'express'
const app=express();
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
    origin:["http://localhost:5173","http://localhost:5174"],
    credentials: true
    }
})
export function getRecieverSocketId(userId){
        return userSocketMap[userId]
}
// Used to store online user
let userSocketMap={}  //{UserId:socketId}
io.on("connection",(socket)=>{
  console.log("A user connected",socket.id)
  const UserId=socket.handshake.query.userId //.
  if(UserId) {
    userSocketMap[UserId]=socket.id;
  }
//   io.emit() is used to send the event to the connected clients
io.emit("getonlineUsers",Object.keys(userSocketMap))
  socket.on("disconnect",()=>{
    console.log("A user disconnected",socket.id)
    delete userSocketMap[UserId]
    io.emit("getonlineUsers",Object.keys(userSocketMap))
  })
})
export {io,server,app}