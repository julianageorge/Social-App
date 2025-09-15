import type { Request,Response,NextFunction } from "express";
import { AuthFactoryService } from "./factory";
import { ConflictException, NotAuthorizedException, NotFoundException } from "../../utils";
import { sendmail } from "../../utils/email";
import { LoginDto, RegisterDto, VerifyDto } from "./auth.dto";
import { UserRepository } from "../../DB";

class AuthService{
    private userRepository=new UserRepository();
    private authfactoryService=new AuthFactoryService();
    constructor(){}
    register=async(req:Request,res:Response,next:NextFunction)=>{
        const registerDto:RegisterDto=req.body;
        const userExist=await this.userRepository.exist({email:registerDto.email});
        if(userExist){
            throw new ConflictException("user already exist");
        }
        const user=this.authfactoryService.register(registerDto);
        await sendmail({to:user.email,subject:"Verify your email",html:`<p>your Otp to verify your account is ${user.otp}</p>`})
        const createdUser=await this.userRepository.create(user);
        return res.status(201).json({message:"user created successfully ",success:true,data:createdUser})

    }

    verify=async(req:Request,res:Response,next:NextFunction)=>{
        const verifydto:VerifyDto=req.body;
        const user=await this.userRepository.getOne({email:verifydto.email});
        if(!user){
            throw new NotFoundException("User Not Found!");
        }
        const UpdatedUser=this.authfactoryService.verify(user,verifydto.otp);
        const result=await this.userRepository.update({email:verifydto.email},UpdatedUser);
     return res.status(200).json({ message: "User verified successfully",result, success: true,});

    }


    login=async (req:Request,res:Response,next:NextFunction)=>{
        const logindto:LoginDto=req.body;
        const user=await this.userRepository.getOne({email:logindto.email});
        if(!user){
            throw new NotAuthorizedException("Invalid Credentials");
        }
        const result= this.authfactoryService.login(user,logindto);
        return res.status(200).json({ message: "Login successful", success: true, ...result });
    }

    

}
export default new AuthService(); 