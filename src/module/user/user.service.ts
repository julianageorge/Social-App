import { NextFunction, Request, Response } from "express";
import { NotFoundException } from "../../utils/error";
import { UserRepository } from "../../DB";

class UserService{
    private readonly userRepositry=new UserRepository();
    constructor(){}
    getProfile=async(req:Request,res:Response,next:NextFunction)=>{
        let user=await this.userRepositry.getOne({_id:req.params.id});
        if(!user){
            throw new NotFoundException("User Not Found!");
        }
        return res.status(200).json({message:"done",user,success:true});

    }
}
export default new UserService();