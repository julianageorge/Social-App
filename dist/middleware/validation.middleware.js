"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValid = void 0;
const utils_1 = require("../utils");
const isValid = (schema) => {
    return (req, res, next) => {
        let data = { ...req.body, ...req.params, ...req.query };
        const result = schema.safeParse(data);
        if (result.success == false) {
            let errorMessage = result.error?.issues.map((issue) => ({
                path: issue.path[0],
                message: issue.message
            }));
            throw new utils_1.BadRequestException("validation failed!", errorMessage);
        }
        next();
    };
};
exports.isValid = isValid;
