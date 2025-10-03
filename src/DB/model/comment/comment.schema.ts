
import { Schema } from "mongoose";
import { Icomment } from "../../../utils";
import { reactionSchema } from "../common/reaction.schema";
export const CommentSchema=new Schema<Icomment>({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    postId:{
        type:Schema.Types.ObjectId,
        ref:"Post",
        required:true
    },
    parentId:{
        type:Schema.Types.ObjectId,
        ref:"Comment"
    },
    content:{type:String},
    reactions:[reactionSchema],
    
    

},{timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}});
CommentSchema.virtual("replies",{
    ref:"Comment",
    foreignField:"parentId",
    localField:"_id"
});
CommentSchema.pre("deleteOne",async function (next) {
    const filter=typeof this.getFilter=="function"?this.getFilter():{};
    const replies=await this.model.find({parentId:filter._id});
    if(replies.length){
        for(const reply of replies){
           await this.model.deleteOne({_id:reply._id});
        }
    }
    
})