"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRepository = void 0;
const abstract_repositry_1 = require("../../abstract.repositry");
const comment_model_1 = require("./comment.model");
class CommentRepository extends abstract_repositry_1.AbstractRepository {
    constructor() {
        super(comment_model_1.Comment);
    }
}
exports.CommentRepository = CommentRepository;
