"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRepository = void 0;
const abstract_repositry_1 = require("../../abstract.repositry");
const post_model_1 = require("./post.model");
class PostRepository extends abstract_repositry_1.AbstractRepository {
    constructor() {
        super(post_model_1.Post);
    }
}
exports.PostRepository = PostRepository;
