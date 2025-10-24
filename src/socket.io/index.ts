import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { socketAuth } from "./middlewares";
import { sendMessage } from "./chat";
const connectedUsers=new Map<string,string>();


export const InitSocket=(server:HttpServer)=>{
    const io=new Server(server,{cors:{  origin:"*"}});
    io.use(socketAuth);

    io.on("connection",(socket:Socket)=>{
        const userId = socket.data.user._id.toString();
        connectedUsers.set(userId,socket.id);
        io.emit("userStatus", { userId, status: "online" });
        socket.on("typing",(destId:string)=>{
            const destSocketId=connectedUsers.get(destId);
            if(destSocketId){
                io.to(destSocketId).emit("typing",userId);
            }
        });
        socket.on("stopTyping",(destId:string)=>{
            const destSocketId=connectedUsers.get(destId);
            if(destSocketId){
                io.to(destSocketId).emit("stopTyping",userId);
            }
        })
    console.log("a user connected");
    socket.on("sendMessage",sendMessage(socket,io,connectedUsers));
    io.on("disconnect",(socket:Socket)=>{
        const userId = socket.data.user._id.toString();
        connectedUsers.delete(userId);
        io.emit("userStatus", { userId, status: "offline" });
    });
    });
    
    return io;
}