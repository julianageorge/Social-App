"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./factory/index");
const comment_repository_1 = require("./../../DB/model/comment/comment.repository");
const DB_1 = require("../../DB");
const utils_1 = require("../../utils");
class CommentService {
    postRepository = new DB_1.PostRepository();
    commentRepository = new comment_repository_1.CommentRepository();
    commentFactoryService = new index_1.CommentFactoryService();
    create = async (req, res) => {
        const { postId, id } = req.params;
        const createCommentdto = req.body;
        const postExist = await this.postRepository.exist({ _id: postId });
        if (!postExist) {
            throw new utils_1.NotFoundException("Post Not Found!");
        }
        let CommentExist = undefined;
        if (id) {
            CommentExist = await this.commentRepository.exist({ _id: id });
            if (!CommentExist) {
                throw new utils_1.NotFoundException("Comment Not Found!");
            }
        }
        const comment = this.commentFactoryService.creatNewComment(createCommentdto, req.user, postExist, CommentExist);
        const newComment = await this.commentRepository.create(comment);
        return res.status(201).json({ message: "comment created Successfully", succcess: true, data: newComment });
    };
}
exports.default = new CommentService();
