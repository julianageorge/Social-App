"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const Token_1 = require("../utils/Token");
const DB_1 = require("../DB");
const utils_1 = require("../utils");
const isAuthenticated = () => {
    return async (req, res, next) => {
        const token = req.headers.authorization;
        const payload = (0, Token_1.verifyToken)(token);
        const userRepositry = new DB_1.UserRepository();
        const user = await userRepositry.exist({ _id: payload._id });
        if (!user) {
            throw new utils_1.NotFoundException("User Not Found !");
        }
        req.user = user;
        next();
    };
};
exports.isAuthenticated = isAuthenticated;
