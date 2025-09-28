import { Schema } from "mongoose";
import { IPost, IReaction, REACTION } from "../../../utils";
import { reactionSchema } from "../common/reaction.schema";

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
PostSchema.virtual("comments",{localField:"_id",foreignField:"postId",ref:"Comment"})