import { Socket } from "socket.io";
import { verifyToken } from "../../utils/Token";
import { NotFoundException } from "../../utils";
import { UserRepository } from "../../DB";

export const socketAuth=async(socket:Socket,next:Function)=>{
    try{
        const {authorization}=socket.handshake.auth;
        const payload= verifyToken(authorization);
        const userRepo=new UserRepository();

        const user=await userRepo.getOne({_id:payload.id});
        if(!user){
            throw new NotFoundException("User not found");
        }
        socket.data.user=user;
        next();
    } catch(error){
        next(error);
    }
}