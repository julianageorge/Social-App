import { CommentRepository, PostRepository } from "../../../DB";
import { NotFoundException } from "../../error";
import { REACTION } from "../enum";

export const addReactionProvider=async(repo:CommentRepository|PostRepository,id:string,userId:string,reaction:string)=>{
    const ModelExist=await repo.exist({_id:id});
        if(!ModelExist){
            throw new NotFoundException("Post Not Found!");
        }
       let userReacted= ModelExist.reactions.findIndex((reaction)=>{
            return reaction.userId.toString()==userId.toString();
        });
        if(userReacted==-1){
        await repo.update({_id:id},{$push:{reactions:{reaction:[null,undefined,""].includes(reaction)?REACTION.like:reaction,userId}}});
    }
    else if([undefined,null,""].includes(reaction)){
        await repo.update({_id:id},{$pull:{reactions:ModelExist.reactions[userReacted]}});

    }
    
    else{
          await repo.update(
      { _id: id, "reactions.userId": userId },
      { $set: { "reactions.$.reaction": reaction } }
    );
    }
}