import { JwtPayload } from "jsonwebtoken";
import { GENDER, REACTION, SYS_ROLE, USER_AGENT } from "../../../utils/common/enum";
import { Request } from "express";
import { Document, ObjectId } from "mongoose";
export interface IUser{
    _id: ObjectId;
    firstName:string;
    lastName:string;
    fullName?:string;//virtual
    email:string;
    password:string;
    credentialUpdatedAt:Date;
    phonrNumber?:string;
    role:SYS_ROLE;
    gender:GENDER;
    userAgent:USER_AGENT;
    otp?:string;
    otpExpiryAt?:Date
    isVerived:boolean

}
export interface IAttechment{
    url:string;
    id:string;
}
export interface IReaction {
    reaction:REACTION;
    userId:ObjectId
}

export interface IPost{
    _id: ObjectId;
    userId:ObjectId;
    content:string;
    reactions:IReaction[];
    attachments?:IAttechment[];    
}


declare module 'jsonwebtoken'{
    interface JwtPayload{
 _id:string;
    role:string
    }
}

declare module "express" {
  interface Request {
    user: (IUser & Document<any, any, any>);
  }
}

export interface Icomment{
    _id: ObjectId;
    userId:ObjectId;
    postId:ObjectId;
    parentId:ObjectId|null;
    content:string;
    attachment:IAttechment;
    reactions:IReaction[];
    mentions?:ObjectId[];
}