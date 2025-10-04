import { NextFunction, Request, Response } from "express";
import { BadRequestException, NotFoundException } from "../../utils/error";
import { UserRepository } from "../../DB";
import { UpdatePasswordDto } from "./user.dto";
import { CompareHash, generateHash } from "../../utils";

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
    //update password
    public UpdatePassword = async (req: Request, res: Response) => {
        const updatePasswordDto: UpdatePasswordDto = req.body;
        const userId = req.user ._id
      
        if (!updatePasswordDto.oldPassword || !updatePasswordDto.newPassword || !updatePasswordDto.confirmPassword) {
          throw new BadRequestException("All fields are required!");
        }
      
        if (updatePasswordDto.newPassword !== updatePasswordDto.confirmPassword) {
          throw new BadRequestException("New password and confirm password do not match!");
        }
    
        const dbUser = await this.userRepositry.exist({ _id: userId });
        if (!dbUser) {
          throw new BadRequestException("User not found!");
        }
      
        if (!CompareHash(updatePasswordDto.oldPassword, dbUser.password)) {
          throw new BadRequestException("Old password is incorrect!");
        }
      
        dbUser.password = generateHash(updatePasswordDto.newPassword);
        await this.userRepositry.update({ _id: dbUser._id }, dbUser);
      
        return res.status(200).json({ message: "done", success: true });
      };
    }
export default new UserService();