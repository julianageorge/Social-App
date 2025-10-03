"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentFactoryService = void 0;
const entity_1 = require("../entity");
class CommentFactoryService {
    creatNewComment(createCommentdto, user, post, comment) {
        const newComment = new entity_1.Comment();
        newComment.content = createCommentdto.content;
        newComment.userId = user._id;
        newComment.postId = post._id || comment.postId;
        newComment.parentId = comment?._id;
        newComment.reactions = [];
        return newComment;
    }
}
exports.CommentFactoryService = CommentFactoryService;
