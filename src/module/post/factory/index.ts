import { IUser } from '../../../utils';
import { Post } from '../entity';
import { CreatePostDto } from './../post.dto';
export class PostFactoryService{
 createPost=(createPostDto:CreatePostDto,user:IUser)=>{
    const post=new Post();
    post.content=createPostDto.content;
    post.attachment=[];
    post.reactions=[];
    post.userId=user._id;
    return post;



 }   
}