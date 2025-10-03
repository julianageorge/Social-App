import { Schema } from "mongoose";
import { IPost, IReaction, REACTION } from "../../../utils";
import { reactionSchema } from "../common/reaction.schema";
import { Comment } from "../comment/comment.model";

export const PostSchema=new Schema<IPost>({ 
userId:{type:Schema.Types.ObjectId,ref:"User",required:true},
content:{type:String,/*required:function(){
    if(this.attachments.length){
        return false;
    }
    return true;
}*/trim:true},
reactions:[reactionSchema]

},{timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}});
PostSchema.virtual("comments",{localField:"_id",foreignField:"postId",ref:"Comment"});

PostSchema.pre("deleteOne",async function (next){
    const filter=typeof this.getFilter=="function"?this.getFilter():{};
    /*const firstLayer=await Comment.find({postId:filter._id,parentId:null});
    for(const comment of firstLayer){
        if(firstLayer.length){
            await Comment.deleteOne({_id:comment._id});
            
        }
    }*/
   await Comment.deleteMany({postId:filter._id});
    next();

})