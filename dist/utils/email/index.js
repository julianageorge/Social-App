"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = sendMail;
const dev_config_1 = require("./../../config/env/dev.config");
const nodemailer_1 = __importDefault(require("nodemailer"));
async function sendMail({ to, subject, html, tags = [] }) {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: dev_config_1.devConfig.EMAIL,
            pass: dev_config_1.devConfig.PASSWORD,
        },
    });
    await transporter.sendMail({
        from: "'Social App' <julianageorgeeshak@gmail.com>",
        to,
        subject,
        html,
    });
    if (tags.length > 0) {
        console.log("Email sent with tags:", tags);
    }
}
