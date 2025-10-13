"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_service_1 = __importDefault(require("./user.service"));
const auth_middlewae_1 = require("../../middleware/auth.middlewae");
const router = (0, express_1.Router)();
router.get("/:id", user_service_1.default.getProfile);
router.patch("/update-password", (0, auth_middlewae_1.isAuthenticated)(), user_service_1.default.UpdatePassword);
router.patch("/update-basic-info", (0, auth_middlewae_1.isAuthenticated)(), user_service_1.default.UpdateBasicInfo);
router.patch("/update-email", (0, auth_middlewae_1.isAuthenticated)(), user_service_1.default.UpdateEmail);
router.post("/block-user/:userIdToBlock", (0, auth_middlewae_1.isAuthenticated)(), user_service_1.default.BlockUser);
router.post("/unfriend/:freindId", (0, auth_middlewae_1.isAuthenticated)(), user_service_1.default.unFriend);
router.post("/send-friend-request/:targetUserId", (0, auth_middlewae_1.isAuthenticated)(), user_service_1.default.sendFreindRequest);
router.post("/accept-friend-request/:requestId", (0, auth_middlewae_1.isAuthenticated)(), user_service_1.default.acceptFriendRequest);
router.post("/delete-friend-request/:requestId", (0, auth_middlewae_1.isAuthenticated)(), user_service_1.default.deleteFriendRequest);
exports.default = router;
