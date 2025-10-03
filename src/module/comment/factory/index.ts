import { Icomment, IPost, IUser } from '../../../utils';
import { Comment } from '../entity';
import { CreateCommentdto } from './../comment.dto';
export class CommentFactoryService{
    creatNewComment(createCommentdto:CreateCommentdto,user:IUser,post:IPost,comment?:Icomment){
        const newComment = new Comment();
        newComment.content=createCommentdto.content;
        newComment.userId=user._id;
        newComment.postId=post._id||comment.postId;
        newComment.parentId=comment?._id;
        newComment.reactions=[];
        return newComment;
        
    }
}