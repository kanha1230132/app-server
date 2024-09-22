"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthenticate = void 0;
const httpResponse_1 = require("../httpResponse");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constant_1 = require("../helper/constant");
const database_1 = require("../database");
const pathName_1 = require("../router/pathName");
const { JWT_EXPIRE_TIME, COOKIEE_EXPIRE_TIME, JWT_SECRET, COOKIEE_SECRET_KEY } = constant_1.constants;
const UserAuthenticate = (req, res, next) => {
    const path = req.path;
    const isPublicRoute = pathName_1.PublicRoute.includes(path);
    if (isPublicRoute) {
        next();
        return;
    }
    const token = req.headers.token;
    if (!token) {
        console.log(`Token not found in API 234: ${req.path}`);
        return res.status(401).send(new httpResponse_1.HTTPResponse({
            statusCode: httpResponse_1.HttpStatus.UN_AUTHORISED.code,
            httpStatus: httpResponse_1.HttpStatus.UN_AUTHORISED.status,
            message: "Unauthorised! access",
        }));
    }
    try {
        jsonwebtoken_1.default.verify(String(token), JWT_SECRET, 
        // Replace 'your-secret-key' with your actual secret key
        (err, payload) => {
            if (err) {
                return res.send(new httpResponse_1.HTTPResponse({
                    statusCode: httpResponse_1.HttpStatus.UN_AUTHORISED.code,
                    httpStatus: httpResponse_1.HttpStatus.UN_AUTHORISED.status,
                    message: "Token expired",
                    data: [],
                }));
            }
            else {
                if (payload) {
                    console.log("payload ------> ", payload);
                    const userId = payload.userId;
                    console.log(userId, "user id from token");
                    if (userId) {
                        // Attach user details to the request object
                        database_1.UserQuery.getUser(userId, "")
                            .then((response) => __awaiter(void 0, void 0, void 0, function* () {
                            res.locals.user = response;
                            next();
                        }))
                            .catch((err) => {
                            return res.status(409).send(new httpResponse_1.HTTPResponse({
                                statusCode: httpResponse_1.HttpStatus.WARNING.code,
                                httpStatus: httpResponse_1.HttpStatus.WARNING.status,
                                message: err,
                            }));
                        });
                    }
                    else {
                        console.log("Invalid token");
                        return res.status(401).send(new httpResponse_1.HTTPResponse({
                            statusCode: httpResponse_1.HttpStatus.UN_AUTHORISED.code,
                            httpStatus: httpResponse_1.HttpStatus.UN_AUTHORISED.status,
                            message: "ERROR: User unauthenticated!",
                        }));
                    }
                }
                else {
                    return res.send(new httpResponse_1.HTTPResponse({
                        statusCode: httpResponse_1.HttpStatus.UN_AUTHORISED.code,
                        httpStatus: httpResponse_1.HttpStatus.UN_AUTHORISED.status,
                        message: "Token expired",
                        data: [],
                    }));
                }
            }
        });
        return;
    }
    catch (error) {
        return res.status(401).send(new httpResponse_1.HTTPResponse({
            statusCode: httpResponse_1.HttpStatus.UN_AUTHORISED.code,
            httpStatus: httpResponse_1.HttpStatus.UN_AUTHORISED.status,
            message: "Unauthorized: Invalid token",
            data: error,
        }));
    }
};
exports.UserAuthenticate = UserAuthenticate;
