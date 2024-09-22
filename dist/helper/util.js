"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = exports.registerValidation = void 0;
const express_validation_1 = require("express-validation");
exports.registerValidation = express_validation_1.Joi.object({
    firstName: express_validation_1.Joi.string().required(),
    lastName: express_validation_1.Joi.string(),
    email: express_validation_1.Joi.string().email().required(),
    password: express_validation_1.Joi.string().required(),
    passwordConfirm: express_validation_1.Joi.string().required(),
    userType: express_validation_1.Joi.number().max(1).min(0),
});
// Generate a random 6-digit number
const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
};
exports.generateOTP = generateOTP;
