"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.devConfig = {
    DB_URL: process.env.DB_URL,
    SECRET_KEY: process.env.SECRET_KEY,
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,
};
