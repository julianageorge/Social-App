"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authProvider = void 0;
const DB_1 = require("../../../DB");
const utils_1 = require("../../../utils");
exports.authProvider = {
    async checkOtp(verifydto) {
        const userRepository = new DB_1.UserRepository();
        const user = await userRepository.exist({ email: verifydto.email });
        if (!user) {
            throw new utils_1.NotFoundException("User Not Found!");
        }
        if (user.isVerived) {
            throw new utils_1.BadRequestException("User already verified");
        }
        if (user.otp !== verifydto.otp) {
            throw new utils_1.BadRequestException("Invalid OTP");
        }
        if (user.otpExpiryAt < new Date()) {
            throw new utils_1.BadRequestException("OTP expired");
        }
    }
};
