"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const factory_1 = require("./factory");
const utils_1 = require("../../utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const DB_1 = require("../../DB");
const auth_provider_1 = require("./provider/auth.provider");
class AuthService {
    userRepository = new DB_1.UserRepository();
    authfactoryService = new factory_1.AuthFactoryService();
    constructor() { }
    register = async (req, res, next) => {
        const registerDto = req.body;
        const userExist = await this.userRepository.exist({ email: registerDto.email });
        if (userExist) {
            throw new utils_1.ConflictException("user already exist");
        }
        const user = this.authfactoryService.register(registerDto);
        // await sendmail({to:user.email,subject:"Verify your email",html:`<p>your Otp to verify your account is ${user.otp}</p>`})
        const createdUser = await this.userRepository.create(user);
        return res.status(201).json({ message: "user created successfully ", success: true, id: createdUser.id });
    };
    verify = async (req, res, next) => {
        const verifydto = req.body;
        await auth_provider_1.authProvider.checkOtp(verifydto);
        const result = await this.userRepository.update({ email: verifydto.email }, { isVerived: true, $unset: { otp: "", otpExpiryAt: "" } });
        return res.status(200).json({ message: "User verified successfully", result, success: true });
    };
    login = async (req, res, next) => {
        const logindto = req.body;
        const user = await this.userRepository.getOne({ email: logindto.email });
        if (!user) {
            throw new utils_1.NotAuthorizedException("Invalid Credentials");
        }
        const validPassword = (0, utils_1.CompareHash)(logindto.password, user.password);
        if (!validPassword) {
            throw new utils_1.NotAuthorizedException("Invalid credentials");
        }
        if (!user.isVerived) {
            throw new utils_1.BadRequestException("Please verify your email first");
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, role: user.role }, process.env.SECRET_KEY, {
            expiresIn: "5h",
        });
        return res.status(200).json({ message: "Login successful", success: true, user, token });
    };
}
exports.default = new AuthService();
