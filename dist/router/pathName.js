"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicRoute = exports.PathName = void 0;
const version = "v1";
exports.PathName = {
    Login: `/api/${version}/login`,
    Register: `/api/${version}/register`,
    AllUsers: `/api/${version}/manageUsers/getAllUsers`,
    RegisterSendOtp: `/api/${version}/register-send-otp`,
    VerifyOtp: `/api/${version}/verify-otp`,
    SendMessage: `http://192.168.1.6:4001/api/${version}/send-message`,
};
exports.PublicRoute = [
    exports.PathName.Login,
    exports.PathName.Register,
    exports.PathName.RegisterSendOtp,
    exports.PathName.VerifyOtp,
    exports.PathName.SendMessage,
    '/socket.io/'
];
