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
      public BlockUser=async(req:Request,res:Response)=>{
        const { userIdToBlock } = req.params;
        const userId = req.user._id;
        if(userId.toString()===userIdToBlock){
            throw new BadRequestException("You can't block yourself!");
        }
        const user = await this.userRepositry.exist({ _id: userId });
        const userToBlock = await this.userRepositry.exist({ _id: userIdToBlock });
      
        if (!user||!userToBlock) 
          {
            throw new NotFoundException("User not found");
          }
          if (user.blockedUsers?.includes(userToBlock._id)) {
            throw new BadRequestException("User already blocked");
          }
        
          await this.userRepositry.update(
            { _id: userId },
            { $addToSet: { blockedUsers: userToBlock._id },
            $pull: { friends: userToBlock._id } }
          );
        
          return res.status(200).json({ message: "User blocked successfully", success: true });
        };

      public deleteFriendRequest = async (req: Request, res: Response) => {
          const { requestId } = req.params; 
          const userId = req.user._id;
        
          await this.userRepositry.update(
            { _id: userId }, { $pull: { friendRequests: requestId } });
        
          return res.status(200).json({ message: "Friend request deleted", success: true });
        };



        public unFriend=async(req:Request,res:Response)=>{
          const {freindId}=req.params;
          const userId=req.user._id;
          const user=await this.userRepositry.exist({ _id: userId });
          const userToUnFriend=await this.userRepositry.exist({ _id: freindId });
          if(!user||!userToUnFriend){
            throw new NotFoundException("User not found");
          }
          if(!user.friends?.includes(userToUnFriend._id)){
            throw new BadRequestException("You are not friends with this user");
          }
          if (user.blockedUsers?.includes(userToUnFriend._id) || userToUnFriend.blockedUsers?.includes(userId)) {
            throw new BadRequestException("Cannot remove friend from blocked user");
          }
          await this.userRepositry.update(
            { _id: userId },
            { $pull: { friends: userToUnFriend._id } }
          );
          await this.userRepositry.update(
            { _id: userToUnFriend._id },
            { $pull: { friends: userId } }
          );
          return res.status(200).json({ message: "Friend removed successfully", success: true });
        }


        public sendFreindRequest=async(req:Request,res:Response)=>{
          const {targetUserId}=req.params;
          const userId=req.user._id;
          if(userId.toString()===targetUserId.toString()){
            throw new BadRequestException("You can't send friend request to yourself!");
          }
          const user=await this.userRepositry.exist({ _id: userId });
          const targetUser=await this.userRepositry.exist({ _id: targetUserId });
          if(!user||!targetUser){
            throw new NotFoundException("User not found");
          }
          if(user.friendRequests?.includes(targetUser._id)){
            throw new BadRequestException("Friend request already sent");
          }
          if(user.friends?.includes(targetUser._id)){
            throw new BadRequestException("You are already friends with this user");
          }
          if (user.blockedUsers?.includes(targetUser._id) || targetUser.blockedUsers?.includes(userId)) {
            throw new BadRequestException("Cannot send request to blocked user");
          }
          await this.userRepositry.update(
            { _id: targetUserId },
            { $addToSet: { friendRequests: userId } }
          );
          return res.status(200).json({ message: "Friend request sent successfully", success: true });
        }
        public acceptFriendRequest=async(req:Request,res:Response)=>{
          const {requestId}=req.params;
          const userId=req.user._id;
          const user=await this.userRepositry.exist({ _id: userId });
          const requestUser=await this.userRepositry.exist({ _id: requestId });
          if(!user||!requestUser){
            throw new NotFoundException("User not found");
          }
          if(!user.friendRequests?.includes(requestUser._id)){
            throw new BadRequestException("Friend request not found");
          }
          if(user.friends?.includes(requestUser._id)){
            throw new BadRequestException("You are already friends with this user");
          }
          if (user.blockedUsers?.includes(requestUser._id) || requestUser.blockedUsers?.includes(userId)) {
            throw new BadRequestException("Cannot accept request from blocked user");
          }
          await this.userRepositry.update(
            { _id: userId },
            { $addToSet: { friends: requestUser._id },
            $pull: { friendRequests: requestUser._id } }
          );
          await this.userRepositry.update(
            { _id: requestUser._id },
            { $pull: { friendRequests: userId } }
          );
          return res.status(200).json({ message: "Friend request accepted successfully", success: true });
        }
    }     

export default new UserService();