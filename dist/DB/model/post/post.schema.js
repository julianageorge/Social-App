"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = void 0;
const mongoose_1 = require("mongoose");
const reaction_schema_1 = require("../common/reaction.schema");
const comment_model_1 = require("../comment/comment.model");
exports.PostSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, /*required:function(){
            if(this.attachments.length){
                return false;
            }
            return true;
        }*/
        trim: true },
    reactions: [reaction_schema_1.reactionSchema],
    isFrozen: { type: Boolean, default: false }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
exports.PostSchema.virtual("comments", { localField: "_id", foreignField: "postId", ref: "Comment" });
exports.PostSchema.pre("deleteOne", async function (next) {
    const filter = typeof this.getFilter == "function" ? this.getFilter() : {};
    /*const firstLayer=await Comment.find({postId:filter._id,parentId:null});
    for(const comment of firstLayer){
        if(firstLayer.length){
            await Comment.deleteOne({_id:comment._id});
            
        }
    }*/
    await comment_model_1.Comment.deleteMany({ postId: filter._id });
    next();
});
