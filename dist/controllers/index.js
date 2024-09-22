"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("./auth/auth.controller");
const user_controller_1 = require("./user/user.controller");
exports.default = {
    CallToLoginUser: auth_controller_1.CallToLoginUser,
    CallToRegisterUser: user_controller_1.CallToRegisterUser,
    CallToGetAllUsers: user_controller_1.CallToGetAllUsers,
    CallToUserLogout: user_controller_1.CallToUserLogout,
    CallToVerifyEmailId: user_controller_1.CallToVerifyEmailId,
    CallToVerifyOtp: user_controller_1.CallToVerifyOtp
};
