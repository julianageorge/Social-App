"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
const crypto_1 = require("../../../utils/crypto");
const entity_1 = require("../../auth/entity");
class UserFactory {
    UpdateBasicInfo(updateBasicInfoDto) {
        const user = new entity_1.User();
        if (updateBasicInfoDto.fullName) {
            user.fullName = updateBasicInfoDto.fullName;
        }
        if (updateBasicInfoDto.gender) {
            user.gender = updateBasicInfoDto.gender;
        }
        if (updateBasicInfoDto.phoneNumber) {
            user.phonrNumber = (0, crypto_1.encryption)(updateBasicInfoDto.phoneNumber, process.env.SECRET_KEY);
        }
        if (updateBasicInfoDto.email) {
            user.email = updateBasicInfoDto.email;
        }
        return user;
    }
}
exports.UserFactory = UserFactory;
