import { BadRequestException, IUser, NotAuthorizedException } from "../../../utils";
import { SYS_ROLE, USER_AGENT } from "../../../utils/common/enum";
import { encryption } from "../../../utils/crypto";
import { CompareHash, generateHash } from "../../../utils/hash";
import { generateExpireyDate, generateOtp } from "../../../utils/OTP";
import { LoginDto, RegisterDto } from "../auth.dto";
import jwt from "jsonwebtoken";
import { User } from "../entity";


export class AuthFactoryService{
    register(registerDto:RegisterDto){
        const user= new User();
    user.fullName=registerDto.fullName as string;
    user.password=generateHash(registerDto.password);
    user.email=registerDto.email;
    user.phonrNumber=encryption(registerDto.phonrNumber as string,process.env.SECRET_KEY as string)// todo encrypt phone
    user.otp=generateOtp();
    user.otpExpiryAt=generateExpireyDate(5*60*60*1000) as unknown as Date;
    user.credentialUpdatedAt=Date.now() as unknown as Date;
    user.role=SYS_ROLE.user;
    user.gender=registerDto.gender;
    user.userAgent=USER_AGENT.local;
    return user;

    }
    verify(user:IUser,otp:string){
        if(user.isVerived){
            throw new BadRequestException("User already verified")
        }
         if (user.otp !== otp) {
      throw new BadRequestException("Invalid OTP");
    }

    if (!user.otpExpiryAt || user.otpExpiryAt < new Date()) {
      throw new BadRequestException("OTP expired");
    }
    user.isVerived = true;
     user.otp="" ;
     user.otpExpiryAt=new Date();

    return user;
  
    }

   login(user:IUser,loginDto:LoginDto){
        const validPassword=CompareHash(loginDto.password,user.password);

         if (!validPassword) {
            throw new NotAuthorizedException("Invalid credentials");
        }
       if(!user.isVerived){
            throw new BadRequestException("Please verify your email first");
        }


        const token = jwt.sign({email:user.email,role:user.role}, process.env.SECRET_KEY as string, {
            expiresIn: "5h", 
        });
        return {
            token,user:{
                fullName: user.fullName,
                email: user.email,
                role: user.role,
            }
        }

        
    }
    
  
}