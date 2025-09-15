import { GENDER } from "../../utils/common/enum";
//DTO >> data to object 

export interface RegisterDto{
        fullName?:string;//virtual
        email:string;
        password:string;
        phonrNumber?:string;
        gender:GENDER;
        
    }
    export interface VerifyDto{
        email:string;
        otp:string;
    }
    export interface LoginDto{
        email:string;
        password:string;
    }

export interface UpdateUserDto extends Partial <RegisterDto>{

}