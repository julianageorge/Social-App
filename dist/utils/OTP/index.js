"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateExpireyDate = exports.generateOtp = void 0;
const generateOtp = () => {
    return Math.floor(Math.random() * 99999 + 10000);
};
exports.generateOtp = generateOtp;
const generateExpireyDate = (time) => {
    return Date.now() + time;
};
exports.generateExpireyDate = generateExpireyDate;
