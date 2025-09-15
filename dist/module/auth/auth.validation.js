"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = exports.RegisterSchema = void 0;
const zod_1 = require("zod");
const utils_1 = require("../../utils");
exports.RegisterSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(2).max(20),
    email: zod_1.z.email(),
    password: zod_1.z.string(),
    phonrNumber: zod_1.z.string().optional(),
    gender: zod_1.z.enum(utils_1.GENDER)
});
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.email(),
    password: zod_1.z.string(),
});
