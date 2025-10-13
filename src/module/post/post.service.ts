
import { success } from 'zod';
import { PostRepository } from '../../DB/model/post/post.repository';
import { NotAuthorizedException, NotFoundException, REACTION } from '../../utils';
import { PostFactoryService } from './factory';
import { CreatePostDto } from './post.dto';
import { NextFunction, Request, Response } from "express";
import { addReactionProvider } from '../../utils/common/provider/react.provider';

class PostService{
    private readonly postRepository=new PostRepository();
    private readonly postFactorySrvice=new PostFactoryService();

    public create=async (req:Request,res:Response,next:NextFunction)=>{

        const createPostDto:CreatePostDto=req.body;
        const post=this.postFactorySrvice.createPost(createPostDto,req.user);
        const newPost=await this.postRepository.create(post);
        return res.status(201).json({message:"Post created successfully",newPost,success:true});


    }
    public addReaction=async(req:Request,res:Response)=>{
        const {id}=req.params;
        const userId=req.user._id;
         const { reaction } = req.body;
        await addReactionProvider(this.postRepository,id,userId.toString(),reaction);
    
        return res.sendStatus(204);
         }
    public getSpcificPost=async (req:Request,res:Response)=>{
        const {id}=req.params;
        const postExiste=await this.postRepository.getOne({_id:id},{},
            {populate:[{path:"userId",select:"fullName firstName lastName"},
            {path:"reactions.userId",select:"fullName firstName lastName"},
            {path:"comments",match:{parentId:null}}]});
        if(!postExiste){
            throw new NotFoundException("Post Not Found!");
        }
        return res.status(200).json({message:"done",success:true,postExiste});

      }
    public hardDeletePost=async(req:Request,res:Response)=>{
        const {id}=req.params;
        const PostExist=await this.postRepository.exist({_id:id});
        if(!PostExist){
            throw new NotFoundException("Post Not Found!");
        }
        if(PostExist.userId.toString()!=req.user._id.toString()){
            throw new NotAuthorizedException("you are not authorize to delete this post")

        }
        await this.postRepository.delete({_id:id});
        return res.sendStatus(204);
    }
    public updatePost=async(req:Request,res:Response)=>{
        const {id}=req.params;
        const {content}=req.body;
        const PostExist=await this.postRepository.exist({_id:id});
        if(!PostExist){
            throw new NotFoundException("Post Not Found!");
        }
        if (PostExist.isFrozen)
            throw new NotAuthorizedException("This post is frozen and cannot be updated.");
        
          if (PostExist.userId.toString() !== req.user._id.toString())
            throw new NotAuthorizedException("You are not authorized to update this post.");
        
        const updatedPost = await this.postRepository.update({ _id: id }, { content });
        return res.status(200).json({ message: "Post updated successfully", success: true });
    };
    public freezePost=async(req:Request,res:Response)=>{
        const {id}=req.params;
        const PostExist=await this.postRepository.exist({_id:id});
        if(!PostExist){
            throw new NotFoundException("Post Not Found!");
        }
        if(PostExist.userId.toString()!=req.user._id.toString()){
            throw new NotAuthorizedException("you are not authorize to freeze this post")
        }
       await this.postRepository.update({ _id: id }, {$set:{ isFrozen: true }});
        return res.status(200).json({ message: "Post frozen successfully", success: true });
    }
}
 export default new PostService();