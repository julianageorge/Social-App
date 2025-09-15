import { GENDER, SYS_ROLE, USER_AGENT } from "../../../utils/common/enum";
export interface IUser{
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