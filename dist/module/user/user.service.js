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
    UpdateEmail = async (req, res) => {
        const updateEmailDto = req.body;
        const userId = req.user._id;
        const existingUser = await this.userRepositry.exist({ email: updateEmailDto.email });
        if (existingUser && existingUser._id.toString() !== userId.toString()) {
            throw new error_1.BadRequestException("Email already in use!");
        }
        const updatedFields = this.userFactory.UpdateEmail(updateEmailDto);
        const updatedUser = await this.userRepositry.updateOne({ _id: userId }, updatedFields, { new: true });
        return res.status(200).json({ message: "Email updated successfully", user: updatedUser, success: true });
    };
    BlockUser = async (req, res) => {
        const { userIdToBlock } = req.params;
        const userId = req.user._id;
        if (userId.toString() === userIdToBlock) {
            throw new error_1.BadRequestException("You can't block yourself!");
        }
        const user = await this.userRepositry.exist({ _id: userId });
        const userToBlock = await this.userRepositry.exist({ _id: userIdToBlock });
        if (!user || !userToBlock) {
            throw new error_1.NotFoundException("User not found");
        }
        if (user.blockedUsers?.includes(userToBlock._id)) {
            throw new error_1.BadRequestException("User already blocked");
        }
        await this.userRepositry.update({ _id: userId }, { $addToSet: { blockedUsers: userToBlock._id },
            $pull: { friends: userToBlock._id } });
        return res.status(200).json({ message: "User blocked successfully", success: true });
    };
    deleteFriendRequest = async (req, res) => {
        const { requestId } = req.params;
        const userId = req.user._id;
        await this.userRepositry.update({ _id: userId }, { $pull: { friendRequests: requestId } });
        return res.status(200).json({ message: "Friend request deleted", success: true });
    };
    unFriend = async (req, res) => {
        const { freindId } = req.params;
        const userId = req.user._id;
        const user = await this.userRepositry.exist({ _id: userId });
        const userToUnFriend = await this.userRepositry.exist({ _id: freindId });
        if (!user || !userToUnFriend) {
            throw new error_1.NotFoundException("User not found");
        }
        if (!user.friends?.includes(userToUnFriend._id)) {
            throw new error_1.BadRequestException("You are not friends with this user");
        }
        if (user.blockedUsers?.includes(userToUnFriend._id) || userToUnFriend.blockedUsers?.includes(userId)) {
            throw new error_1.BadRequestException("Cannot remove friend from blocked user");
        }
        await this.userRepositry.update({ _id: userId }, { $pull: { friends: userToUnFriend._id } });
        await this.userRepositry.update({ _id: userToUnFriend._id }, { $pull: { friends: userId } });
        return res.status(200).json({ message: "Friend removed successfully", success: true });
    };
    sendFreindRequest = async (req, res) => {
        const { targetUserId } = req.params;
        const userId = req.user._id;
        if (userId.toString() === targetUserId.toString()) {
            throw new error_1.BadRequestException("You can't send friend request to yourself!");
        }
        const user = await this.userRepositry.exist({ _id: userId });
        const targetUser = await this.userRepositry.exist({ _id: targetUserId });
        if (!user || !targetUser) {
            throw new error_1.NotFoundException("User not found");
        }
        if (user.friendRequests?.includes(targetUser._id)) {
            throw new error_1.BadRequestException("Friend request already sent");
        }
        if (user.friends?.includes(targetUser._id)) {
            throw new error_1.BadRequestException("You are already friends with this user");
        }
        if (user.blockedUsers?.includes(targetUser._id) || targetUser.blockedUsers?.includes(userId)) {
            throw new error_1.BadRequestException("Cannot send request to blocked user");
        }
        await this.userRepositry.update({ _id: targetUserId }, { $addToSet: { friendRequests: userId } });
        return res.status(200).json({ message: "Friend request sent successfully", success: true });
    };
    acceptFriendRequest = async (req, res) => {
        const { requestId } = req.params;
        const userId = req.user._id;
        const user = await this.userRepositry.exist({ _id: userId });
        const requestUser = await this.userRepositry.exist({ _id: requestId });
        if (!user || !requestUser) {
            throw new error_1.NotFoundException("User not found");
        }
        if (!user.friendRequests?.includes(requestUser._id)) {
            throw new error_1.BadRequestException("Friend request not found");
        }
        if (user.friends?.includes(requestUser._id)) {
            throw new error_1.BadRequestException("You are already friends with this user");
        }
        if (user.blockedUsers?.includes(requestUser._id) || requestUser.blockedUsers?.includes(userId)) {
            throw new error_1.BadRequestException("Cannot accept request from blocked user");
        }
        await this.userRepositry.update({ _id: userId }, { $addToSet: { friends: requestUser._id },
            $pull: { friendRequests: requestUser._id } });
        await this.userRepositry.update({ _id: requestUser._id }, { $pull: { friendRequests: userId } });
        return res.status(200).json({ message: "Friend request accepted successfully", success: true });
    };
}
exports.default = new UserService();
