
import { PostRepository } from '../../DB/model/post/post.repository';
import { NotFoundException, REACTION } from '../../utils';
import { PostFactoryService } from './factory';
import { CreatePostDto } from './post.dto';
import { NextFunction, Request, Response } from "express";

class PostService{
    private readonly postRepository=new PostRepository();
    private readonly postFactorySrvice=new PostFactoryService();

    create=async (req:Request,res:Response,next:NextFunction)=>{

        const createPostDto:CreatePostDto=req.body;
        const post=this.postFactorySrvice.createPost(createPostDto,req.user);
        const newPost=await this.postRepository.create(post);
        return res.status(201).json({message:"Post created successfully",newPost,success:true});


    }
     addReaction=async(req:Request,res:Response)=>{
        const {id}=req.params;
        const userId=req.user._id;
         const { reaction } = req.body
        const posttExistense=await this.postRepository.exist({_id:id});
        if(!posttExistense){
            throw new NotFoundException("Post Not Found!");
        }
       let userReacted= posttExistense.reactions.findIndex((reaction)=>{
            return reaction.userId.toString()==userId.toString();
        });
        if(userReacted==-1){
        await this.postRepository.update({_id:id},{$push:{reactions:{reaction:[null,undefined,""].includes(reaction)?REACTION.like:reaction,userId}}});
    }
    else if([undefined,null,""].includes(reaction)){
        await this.postRepository.update({_id:id},{$pull:{reactions:posttExistense.reactions[userReacted]}});

    }
    
    else{
          await this.postRepository.update(
      { _id: id, "reactions.userId": userId },
      { $set: { "reactions.$.reaction": reaction } }
    );
    }
        return res.sendStatus(204);
         }
}
 export default new PostService();