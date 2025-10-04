"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../../utils/error");
const DB_1 = require("../../DB");
const utils_1 = require("../../utils");
const factory_1 = require("./factory");
class UserService {
    userRepositry = new DB_1.UserRepository();
    userFactory = new factory_1.UserFactory();
    constructor() { }
    getProfile = async (req, res, next) => {
        let user = await this.userRepositry.getOne({ _id: req.params.id });
        if (!user) {
            throw new error_1.NotFoundException("User Not Found!");
        }
        return res.status(200).json({ message: "done", user, success: true });
    };
    //update password
    UpdatePassword = async (req, res) => {
        const updatePasswordDto = req.body;
        const userId = req.user._id;
        if (!updatePasswordDto.oldPassword || !updatePasswordDto.newPassword || !updatePasswordDto.confirmPassword) {
            throw new error_1.BadRequestException("All fields are required!");
        }
        if (updatePasswordDto.newPassword !== updatePasswordDto.confirmPassword) {
            throw new error_1.BadRequestException("New password and confirm password do not match!");
        }
        const dbUser = await this.userRepositry.exist({ _id: userId });
        if (!dbUser) {
            throw new error_1.BadRequestException("User not found!");
        }
        if (!(0, utils_1.CompareHash)(updatePasswordDto.oldPassword, dbUser.password)) {
            throw new error_1.BadRequestException("Old password is incorrect!");
        }
        dbUser.password = (0, utils_1.generateHash)(updatePasswordDto.newPassword);
        await this.userRepositry.update({ _id: dbUser._id }, dbUser);
        return res.status(200).json({ message: "done", success: true });
    };
    UpdateBasicInfo = async (req, res) => {
        const updateBasicInfoDto = req.body;
        const userId = req.user._id;
        if (updateBasicInfoDto.email) {
            const existingUser = await this.userRepositry.exist({ email: updateBasicInfoDto.email });
            if (existingUser && existingUser._id.toString() !== userId.toString()) {
                throw new error_1.BadRequestException("Email already in use!");
            }
        }
        const updatedFields = this.userFactory.UpdateBasicInfo(updateBasicInfoDto);
        const updatedUser = await this.userRepositry.updateOne({ _id: userId }, updatedFields, { new: true });
        return res.status(200).json({ message: "Basic info updated successfully", user: updatedUser, success: true });
    };
}
exports.default = new UserService();
