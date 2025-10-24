import { Schema } from "mongoose";
import { IChat } from "../../../utils";

export const ChatSchema=new Schema<IChat>({
    message:[{type:Schema.Types.ObjectId,ref:"Message",required:true}],
    users:[{type:Schema.Types.ObjectId,ref:"User",required:true}]
},{timestamps:true})
    
