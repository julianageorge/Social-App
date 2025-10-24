import { Request,Response,NextFunction } from "express";
import { verifyToken } from "../utils/Token";
import { UserRepository } from "../DB";
import { NotFoundException } from "../utils";

export const isAuthenticated=()=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
    const token=req.headers.authorization as string;
    const payload=verifyToken(token);
    const userRepositry=new UserRepository();
    const user= await userRepositry.exist({_id:payload._id},{},{populate:[{path:"friends",select:"fullName firstName lastName"}]});
    
    if(!user){
        throw new NotFoundException("User Not Found !");
    }
    req.user=user;
    next();


}
}