import { Schema } from "mongoose";
import { IMessage } from "../../../utils";

export const MessageSchema=new Schema<IMessage>({
    content:{type:String,required:true},
    sender:{type:Schema.Types.ObjectId,ref:"User",required:true},
    attachment:{type:Schema.Types.ObjectId,ref:"Attachment",required:false},
    reactions:[{type:Schema.Types.ObjectId,ref:"Reaction",required:false}],
    mentions:[{type:Schema.Types.ObjectId,ref:"User",required:false}],
    isFrozen:{type:Boolean,required:false,default:false}
},{timestamps:true})
    
