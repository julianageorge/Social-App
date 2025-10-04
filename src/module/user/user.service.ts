import { NextFunction, Request, Response } from "express";
import { BadRequestException, NotFoundException } from "../../utils/error";
import { UserRepository } from "../../DB";
import { UpdateBasicInfoDto, UpdateEmailDto, UpdatePasswordDto } from "./user.dto";
import { CompareHash, generateHash } from "../../utils";
import { UserFactory } from "./factory";

class UserService{
    private readonly userRepositry=new UserRepository();
    private readonly userFactory=new UserFactory();
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


      public UpdateBasicInfo = async (req: Request, res: Response) => {
          const updateBasicInfoDto: UpdateBasicInfoDto = req.body;
          const userId = req.user._id;

          if (updateBasicInfoDto.email) {
            const existingUser = await this.userRepositry.exist({ email: updateBasicInfoDto.email });
            if (existingUser && existingUser._id.toString() !== userId.toString()) {
              throw new BadRequestException("Email already in use!");
            }
          }
      
          
          const updatedFields = this.userFactory.UpdateBasicInfo(updateBasicInfoDto);
          const updatedUser=await this.userRepositry.updateOne({ _id: userId },updatedFields,{new:true});
          return res.status(200).json({ message: "Basic info updated successfully",user: updatedUser,success: true});
      };

      public UpdateEmail = async (req: Request, res: Response) => {
        const updateEmailDto: UpdateEmailDto = req.body;
        const userId = req.user._id;
        const existingUser = await this.userRepositry.exist({ email: updateEmailDto.email });
        if (existingUser && existingUser._id.toString() !== userId.toString()) {
          throw new BadRequestException("Email already in use!");
        }
    
        const updatedFields = this.userFactory.UpdateEmail(updateEmailDto);
        const updatedUser = await this.userRepositry.updateOne({ _id: userId }, updatedFields, { new: true });
    
        return res.status(200).json({ message: "Email updated successfully", user: updatedUser, success: true });
      };
    }      
export default new UserService();