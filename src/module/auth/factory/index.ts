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
    user.isVerived=false;
    return user;

    }}