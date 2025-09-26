"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostFactoryService = void 0;
const entity_1 = require("../entity");
class PostFactoryService {
    createPost = (createPostDto, user) => {
        const post = new entity_1.Post();
        post.content = createPostDto.content;
        post.attachment = [];
        post.reactions = [];
        post.userId = user._id;
        return post;
    };
}
exports.PostFactoryService = PostFactoryService;
