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
exports.default = router;
