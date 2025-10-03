import { Comment } from './../../DB/model/comment/comment.model';
import { CreateCommentdto } from './comment.dto';
import { CommentFactoryService } from './factory/index';
import { CommentRepository } from './../../DB/model/comment/comment.repository';
import { Request, Response } from "express";
import { PostRepository } from "../../DB";
import { Icomment, NotFoundException } from "../../utils";

class CommentService{
    private readonly postRepository=new PostRepository();
    private readonly commentRepository= new CommentRepository();
    private readonly commentFactoryService= new CommentFactoryService();

    create=async(req:Request,res:Response)=>{
        const{postId,id}=req.params;
        const createCommentdto:CreateCommentdto=req.body;
        const postExist=await this.postRepository.exist({_id:postId});
        if( !postExist){
            throw new NotFoundException("Post Not Found!");
        }
        let CommentExist:Icomment|any = undefined;
        if(id){
            CommentExist=await this.commentRepository.exist({_id:id});
            if(!CommentExist){
                throw new NotFoundException("Comment Not Found!");
            }
            }
        const comment= this.commentFactoryService.creatNewComment(createCommentdto,req.user,postExist,CommentExist);
        const newComment= await this.commentRepository.create(comment);
        return res.status(201).json({message:"comment created Successfully",succcess:true,data:newComment});


    }
    getSpcific=async(req:Request,res:Response)=>{
        const {id}=req.params;
        const CommentExist=await this.commentRepository.exist({_id:id},{},{populate:[{path:"replies"}]});
        if(!CommentExist){
            throw new NotFoundException("Comment Not Found");
        }
        return res.status(200).json({message:"Comment fetched successfully",data:{CommentExist},success:true});

    }
}
export default new CommentService();