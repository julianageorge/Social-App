import { Request, Response } from "express";
import { ChatRepository } from "../../DB/model/Chat/chat.repository";
import { message } from "../../DB/model/Message/message.model";
import path from "path";

class ChatService{
    private readonly chatRepository = new ChatRepository();
   getChat=(req:Request,res:Response)=>{
    const {userId}=req.params;
    const userLoginId=req.user._id;
    const chat= this.chatRepository.getOne({users:{$in:[userId,userLoginId]}},{},{populate:{path:"message",select:"content"}});
    return res.json({message:"Chat Found",success:true,data:{chat}})
   }

    
}
export default new ChatService();
