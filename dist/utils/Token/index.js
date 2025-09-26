"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dev_config_1 = require("../../config/env/dev.config");
const generateToken = ({ payload, secertKey = dev_config_1.devConfig.SECRET_KEY, options }) => {
    return jsonwebtoken_1.default.sign(payload, secertKey, options);
};
exports.generateToken = generateToken;
const verifyToken = (token, secretKey = dev_config_1.devConfig.SECRET_KEY) => {
    return jsonwebtoken_1.default.verify(token, secretKey);
};
exports.verifyToken = verifyToken;
