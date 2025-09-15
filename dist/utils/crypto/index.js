"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptPhone = exports.encryption = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const encryption = (phone, secreKey) => {
    return crypto_js_1.default.AES.encrypt(phone, secreKey).toString();
};
exports.encryption = encryption;
const decryptPhone = (encryptedPhone, secretKey) => {
    return crypto_js_1.default.AES.decrypt(encryptedPhone, secretKey);
};
exports.decryptPhone = decryptPhone;
