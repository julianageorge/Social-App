"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //@types/express 
//config();
const app_controller_1 = require("./app.controller");
const app = (0, express_1.default)();
(0, app_controller_1.bootstrap)(app, express_1.default);
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server running on Port", PORT);
});
