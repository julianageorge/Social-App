import type { Request,Response,NextFunction } from "express";
import { AuthFactoryService } from "./factory";
import { BadRequestException, CompareHash, ConflictException, ForbiddenException, NotAuthorizedException, NotFoundException } from "../../utils";
import { sendmail } from "../../utils/email";
import { LoginDto, RegisterDto, VerifyDto } from "./auth.dto";
import jwt from "jsonwebtoken";
import { UserRepository } from "../../DB";
import { authProvider } from "./provider/auth.provider";
import { generateToken } from "../../utils/Token";

class AuthService{
    private userRepository=new UserRepository();
    private authfactoryService=new AuthFactoryService();
    constructor(){}
    register=async(req:Request,res:Response)=>{
        const registerDto:RegisterDto=req.body;
        const userExist=await this.userRepository.exist({email:registerDto.email});
        if(userExist){
            throw new ConflictException("user already exist");
        }
        const user=this.authfactoryService.register(registerDto);
       // await sendmail({to:user.email,subject:"Verify your email",html:`<p>your Otp to verify your account is ${user.otp}</p>`})
        const createdUser=await this.userRepository.create(user);
        return res.status(201).json({message:"user created successfully ",success:true,id:createdUser.id})

    }

    verify=async(req:Request,res:Response)=>{
        const verifydto:VerifyDto=req.body;
       await authProvider.checkOtp(verifydto);
        const result=await this.userRepository.update({email:verifydto.email},{isVerived:true,$unset:{otp:"",otpExpiryAt:""}});
        return res.status(200).json({ message: "User verified successfully",result, success: true});

    }


    login=async (req:Request,res:Response)=>{
        const logindto:LoginDto=req.body;
        const user=await this.userRepository.exist({email:logindto.email});
        if(!user){
            throw new ForbiddenException("Invalid Credentials");
        }
        const validPassword=CompareHash(logindto.password,user.password);
        
                if (!validPassword) {
                    throw new ForbiddenException("Invalid credentials");
                }
            if(!user.isVerived){
                    throw new BadRequestException("Please verify your email first");
                }
                const token = generateToken({payload:{_id:user._id,email:user.email,role:user.role},options:{  expiresIn: "1d"}});

        return res.status(200).json({ message: "Login successful", success: true, user,token});
    }

    

}
export default new AuthService(); 