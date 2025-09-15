"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factory_1 = require("./factory");
const utils_1 = require("../../utils");
const email_1 = require("../../utils/email");
const DB_1 = require("../../DB");
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
        await (0, email_1.sendmail)({ to: user.email, subject: "Verify your email", html: `<p>your Otp to verify your account is ${user.otp}</p>` });
        const createdUser = await this.userRepository.create(user);
        return res.status(201).json({ message: "user created successfully ", success: true, data: createdUser });
    };
    verify = async (req, res, next) => {
        const verifydto = req.body;
        const user = await this.userRepository.getOne({ email: verifydto.email });
        if (!user) {
            throw new utils_1.NotFoundException("User Not Found!");
        }
        const UpdatedUser = this.authfactoryService.verify(user, verifydto.otp);
        const result = await this.userRepository.update({ email: verifydto.email }, UpdatedUser);
        return res.status(200).json({ message: "User verified successfully", result, success: true, });
    };
    login = async (req, res, next) => {
        const logindto = req.body;
        const user = await this.userRepository.getOne({ email: logindto.email });
        if (!user) {
            throw new utils_1.NotAuthorizedException("Invalid Credentials");
        }
        const result = this.authfactoryService.login(user, logindto);
        return res.status(200).json({ message: "Login successful", success: true, ...result });
    };
}
exports.default = new AuthService();
