import { JwtPayload } from "jsonwebtoken";
import { GENDER, REACTION, SYS_ROLE, USER_AGENT } from "../../../utils/common/enum";
import { Request } from "express";
import { ObjectId } from "mongoose";
export interface IUser{
    _id: import("mongoose").Schema.Types.ObjectId;
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
declare module 'express'{
    interface Request{
        user:IUser & Document;
    }
}
export interface Icomment{
    userId:ObjectId;
    postId:ObjectId;
    parentIds:ObjectId[];
    content:string;
    attachment:IAttechment;
    reactions:IReaction[];
    mentions?:ObjectId[];
}