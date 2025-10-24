import { Server, Socket } from "socket.io";
import { MessageRepository } from "../../DB/model/Message/message.repository";
import { ChatRepository } from "../../DB/model/Chat/chat.repository";

export const sendMessage=(socket:Socket,io:Server,connectedUsers:Map<string,string>)=>{
    return async(data:{message:string;destId:string})=>{
    
        const destSocketId=connectedUsers.get(data.destId);
        socket.emit("successMessage",data);
        io.to(destSocketId).emit("reciveMessage",data);
        //save into DB
        // create Message >>id
        const messageRepo=new MessageRepository();
        const sender=socket.data.user.id;
        const message=await messageRepo.create({content:data.message,sender:sender});      
          //create new chat if not exist
          const chatRepo= new ChatRepository();
          const chat=await chatRepo.getOne({users:{$in:[sender,data.destId]}});
          if(!chat){
            await chatRepo.create({users:[sender,data.destId],message:[message._id]})
          }
          else{
            await chatRepo.update(chat._id,{message:[...chat.message,message._id]});
          }
          



    }
}