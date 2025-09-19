"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthFactoryService = void 0;
const enum_1 = require("../../../utils/common/enum");
const crypto_1 = require("../../../utils/crypto");
const hash_1 = require("../../../utils/hash");
const OTP_1 = require("../../../utils/OTP");
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
        user.isVerived = false;
        return user;
    }
}
exports.AuthFactoryService = AuthFactoryService;
