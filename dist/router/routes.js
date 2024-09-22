"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const pathName_1 = require("./pathName");
const controllers_1 = __importDefault(require("../controllers"));
const routes = (router) => {
    router.post(pathName_1.PathName.Register, controllers_1.default.CallToRegisterUser);
    router.post(pathName_1.PathName.Login, controllers_1.default.CallToLoginUser);
    router.post(pathName_1.PathName.AllUsers, controllers_1.default.CallToGetAllUsers);
    router.post(pathName_1.PathName.RegisterSendOtp, controllers_1.default.CallToVerifyEmailId);
    router.post(pathName_1.PathName.VerifyOtp, controllers_1.default.CallToVerifyOtp);
};
exports.routes = routes;
