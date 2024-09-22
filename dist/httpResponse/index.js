"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBadServerMessage = exports.GetSuccessServerMessage = exports.GetInternalServerError = exports.HttpStatus = exports.HTTPResponse = void 0;
const response_1 = __importDefault(require("./response"));
exports.HTTPResponse = response_1.default;
const httpStatus_1 = __importDefault(require("./httpStatus"));
exports.HttpStatus = httpStatus_1.default;
const GetInternalServerError = (message, data) => {
    return new response_1.default({
        statusCode: httpStatus_1.default.INTERNAL_SERVER_ERROR.code,
        httpStatus: httpStatus_1.default.INTERNAL_SERVER_ERROR.status,
        message: message,
        data: data ? data : []
    });
};
exports.GetInternalServerError = GetInternalServerError;
const GetSuccessServerMessage = (message, data) => {
    return new response_1.default({
        statusCode: httpStatus_1.default.OK.code,
        httpStatus: httpStatus_1.default.OK.status,
        message: message,
        data: data ? data : []
    });
};
exports.GetSuccessServerMessage = GetSuccessServerMessage;
const GetBadServerMessage = (message, data) => {
    return new response_1.default({
        statusCode: httpStatus_1.default.BAD_REQUEST.code,
        httpStatus: httpStatus_1.default.BAD_REQUEST.status,
        message: message,
        data: data ? data : []
    });
};
exports.GetBadServerMessage = GetBadServerMessage;
