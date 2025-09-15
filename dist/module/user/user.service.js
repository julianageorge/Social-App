"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../../utils/error");
const DB_1 = require("../../DB");
class UserService {
    userRepositry = new DB_1.UserRepository();
    constructor() { }
    getProfile = async (req, res, next) => {
        let user = await this.userRepositry.getOne({ _id: req.params.id });
        if (!user) {
            throw new error_1.NotFoundException("User Not Found!");
        }
        return res.status(200).json({ message: "done", user, success: true });
    };
}
exports.default = new UserService();
