"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentSchema = void 0;
const mongoose_1 = require("mongoose");
const reaction_schema_1 = require("../common/reaction.schema");
exports.CommentSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    parentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Comment"
    },
    content: { type: String },
    reactions: [reaction_schema_1.reactionSchema],
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
exports.CommentSchema.virtual("replies", {
    ref: "Comment",
    foreignField: "parentId",
    localField: "_id"
});
