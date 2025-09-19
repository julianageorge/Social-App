"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendmail = sendmail;
const dev_config_1 = require("./../../config/env/dev.config");
const nodemailer_1 = __importDefault(require("nodemailer"));
async function sendmail({ to, subject, html }) {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: dev_config_1.devConfig.EMAIL,
            pass: dev_config_1.devConfig.PASSWORD,
        }
    });
    await transporter.sendMail({
        from: "'social App'<julianageorgeeshak@gmail.com>",
        to,
        subject,
        html
    });
}
