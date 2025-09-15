"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthFactoryService = void 0;
const utils_1 = require("../../../utils");
const enum_1 = require("../../../utils/common/enum");
const crypto_1 = require("../../../utils/crypto");
const hash_1 = require("../../../utils/hash");
const OTP_1 = require("../../../utils/OTP");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const entity_1 = require("../entity");
class AuthFactoryService {
    register(registerDto) {
        const user = new entity_1.User();
        user.fullName = registerDto.fullName;
        user.password = (0, hash_1.generateHash)(registerDto.password);
        user.email = registerDto.email;
        user.phonrNumber = (0, crypto_1.encryption)(registerDto.phonrNumber, process.env.SECRET_KEY); // todo encrypt phone
        user.otp = (0, OTP_1.generateOtp)();
        user.otpExpiryAt = (0, OTP_1.generateExpireyDate)(5 * 60 * 60 * 1000);
        user.credentialUpdatedAt = Date.now();
        user.role = enum_1.SYS_ROLE.user;
        user.gender = registerDto.gender;
        user.userAgent = enum_1.USER_AGENT.local;
        return user;
    }
    verify(user, otp) {
        if (user.isVerived) {
            throw new utils_1.BadRequestException("User already verified");
        }
        if (user.otp !== otp) {
            throw new utils_1.BadRequestException("Invalid OTP");
        }
        if (!user.otpExpiryAt || user.otpExpiryAt < new Date()) {
            throw new utils_1.BadRequestException("OTP expired");
        }
        user.isVerived = true;
        user.otp = "";
        user.otpExpiryAt = new Date();
        return user;
    }
    login(user, loginDto) {
        const validPassword = (0, hash_1.CompareHash)(loginDto.password, user.password);
        if (!validPassword) {
            throw new utils_1.NotAuthorizedException("Invalid credentials");
        }
        if (!user.isVerived) {
            throw new utils_1.BadRequestException("Please verify your email first");
        }
        const token = jsonwebtoken_1.default.sign({ email: user.email, role: user.role }, process.env.SECRET_KEY, {
            expiresIn: "5h",
        });
        return {
            token, user: {
                fullName: user.fullName,
                email: user.email,
                role: user.role,
            }
        };
    }
}
exports.AuthFactoryService = AuthFactoryService;
