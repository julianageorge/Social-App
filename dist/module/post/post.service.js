"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_repository_1 = require("../../DB/model/post/post.repository");
const utils_1 = require("../../utils");
const factory_1 = require("./factory");
const react_provider_1 = require("../../utils/common/provider/react.provider");
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
        await (0, react_provider_1.addReactionProvider)(this.postRepository, id, userId.toString(), reaction);
        return res.sendStatus(204);
    };
    getSpcificPost = async (req, res) => {
        const { id } = req.params;
        const postExiste = await this.postRepository.getOne({ _id: id }, {}, { populate: [{ path: "userId", select: "fullName firstName lastName" },
                { path: "reactions.userId", select: "fullName firstName lastName" },
                { path: "comments", match: { parentId: null } }] });
        if (!postExiste) {
            throw new utils_1.NotFoundException("Post Not Found!");
        }
        return res.status(200).json({ message: "done", success: true, postExiste });
    };
    hardDeletePost = async (req, res) => {
        const { id } = req.params;
        const PostExist = await this.postRepository.exist({ _id: id });
        if (!PostExist) {
            throw new utils_1.NotFoundException("Post Not Found!");
        }
        if (PostExist.userId.toString() != req.user._id.toString()) {
            throw new utils_1.NotAuthorizedException("you are not authorize to delete this post");
        }
        await this.postRepository.delete({ _id: id });
        return res.sendStatus(204);
    };
    updatePost = async (req, res) => {
        const { id } = req.params;
        const { content } = req.body;
        const PostExist = await this.postRepository.exist({ _id: id });
        if (!PostExist) {
            throw new utils_1.NotFoundException("Post Not Found!");
        }
        if (PostExist.isFrozen)
            throw new utils_1.NotAuthorizedException("This post is frozen and cannot be updated.");
        if (PostExist.userId.toString() !== req.user._id.toString())
            throw new utils_1.NotAuthorizedException("You are not authorized to update this post.");
        const updatedPost = await this.postRepository.update({ _id: id }, { content });
        return res.status(200).json({ message: "Post updated successfully", success: true });
    };
    freezePost = async (req, res) => {
        const { id } = req.params;
        const PostExist = await this.postRepository.exist({ _id: id });
        if (!PostExist) {
            throw new utils_1.NotFoundException("Post Not Found!");
        }
        if (PostExist.userId.toString() != req.user._id.toString()) {
            throw new utils_1.NotAuthorizedException("you are not authorize to freeze this post");
        }
        await this.postRepository.update({ _id: id }, { $set: { isFrozen: true } });
        return res.status(200).json({ message: "Post frozen successfully", success: true });
    };
}
exports.default = new PostService();
