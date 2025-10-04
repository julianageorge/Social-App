import { GENDER } from "../../utils";

export interface UpdatePasswordDto{
    oldPassword:string;
    newPassword:string;
    confirmPassword:string;
}
export interface UpdateBasicInfoDto{
    fullName?:string;
    email:string;
    password:string;
    phoneNumber?:string;
    gender:GENDER;
           
}
export interface UpdateEmailDto {
    email: string;
}
