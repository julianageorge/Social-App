"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = void 0;
const mongoose_1 = require("mongoose");
const reaction_schema_1 = require("../common/reaction.schema");
exports.PostSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, /*required:function(){
            if(this.attachments.length){
                return false;
            }
            return true;
        }*/
        trim: true },
    reactions: [reaction_schema_1.reactionSchema]
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
exports.PostSchema.virtual("comments", { localField: "_id", foreignField: "postId", ref: "Comment" });
