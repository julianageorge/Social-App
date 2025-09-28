"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_repository_1 = require("../../DB/model/post/post.repository");
const utils_1 = require("../../utils");
const factory_1 = require("./factory");
class PostService {
    postRepository = new post_repository_1.PostRepository();
    postFactorySrvice = new factory_1.PostFactoryService();
    create = async (req, res, next) => {
        const createPostDto = req.body;
        const post = this.postFactorySrvice.createPost(createPostDto, req.user);
        const newPost = await this.postRepository.create(post);
        return res.status(201).json({ message: "Post created successfully", newPost, success: true });
    };
    addReaction = async (req, res) => {
        const { id } = req.params;
        const userId = req.user._id;
        const { reaction } = req.body;
        const posttExistense = await this.postRepository.exist({ _id: id });
        if (!posttExistense) {
            throw new utils_1.NotFoundException("Post Not Found!");
        }
        let userReacted = posttExistense.reactions.findIndex((reaction) => {
            return reaction.userId.toString() == userId.toString();
        });
        if (userReacted == -1) {
            await this.postRepository.update({ _id: id }, { $push: { reactions: { reaction: [null, undefined, ""].includes(reaction) ? utils_1.REACTION.like : reaction, userId } } });
        }
        else if ([undefined, null, ""].includes(reaction)) {
            await this.postRepository.update({ _id: id }, { $pull: { reactions: posttExistense.reactions[userReacted] } });
        }
        else {
            await this.postRepository.update({ _id: id, "reactions.userId": userId }, { $set: { "reactions.$.reaction": reaction } });
        }
        return res.sendStatus(204);
    };
    getSpcificPost = async (req, res) => {
        const { id } = req.params;
        const postExiste = await this.postRepository.getOne({ _id: id }, {}, { populate: [{ path: "userId", select: "fullName firstName lastName" },
                { path: "reactions.userId", select: "fullName firstName lastName" },
                { path: "comments", match: { parentIds: [] } }] });
        if (!postExiste) {
            throw new utils_1.NotFoundException("Post Not Found!");
        }
        return res.status(200).json({ message: "done", success: true, postExiste });
    };
}
exports.default = new PostService();
