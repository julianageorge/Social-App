"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const abstract_repositry_1 = require("../../abstract.repositry");
const user_model_1 = require("./user.model");
class UserRepository extends abstract_repositry_1.AbstractRepository {
    constructor() {
        super(user_model_1.User);
    }
    async getAllUsers() {
        return await this.model.find();
    }
    async updateOne(filter, update, options) {
        const updatedDoc = await this.model.findOneAndUpdate(filter, update, { ...options, new: true });
        return updatedDoc;
    }
}
exports.UserRepository = UserRepository;
