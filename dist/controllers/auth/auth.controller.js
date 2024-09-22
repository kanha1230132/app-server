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
exports.CallToLoginUser = void 0;
const database_1 = require("../../database");
const httpResponse_1 = require("../../httpResponse");
const constant_1 = require("../../helper/constant");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { JWT_EXPIRE_TIME, COOKIEE_EXPIRE_TIME, JWT_SECRET, COOKIEE_SECRET_KEY } = constant_1.constants;
const CallToLoginUser = (req, res) => {
    const { email, password } = req.body;
    database_1.UserQuery.getUser(0, email, true)
        .then((response) => __awaiter(void 0, void 0, void 0, function* () {
        if (response) {
            console.log("response ----->", response);
            // if (await comparePassword(password, response.password)) {
            if (password === response.password) {
                jsonwebtoken_1.default.sign({
                    "userId": response.userid,
                }, JWT_SECRET, { expiresIn: JWT_EXPIRE_TIME }, (err, token) => {
                    console.log("Login token ---->", token);
                    if (err) {
                        res.status(500).send(new httpResponse_1.HTTPResponse({
                            statusCode: httpResponse_1.HttpStatus.INTERNAL_SERVER_ERROR.code,
                            httpStatus: httpResponse_1.HttpStatus.INTERNAL_SERVER_ERROR.status,
                            message: "Internal Server Error",
                        }));
                    }
                    else {
                        res.cookie(COOKIEE_SECRET_KEY, JSON.stringify({
                            userId: response.userId,
                        }), {
                            maxAge: COOKIEE_EXPIRE_TIME,
                        });
                        return res
                            .status(200)
                            .send(new httpResponse_1.HTTPResponse({
                            statusCode: httpResponse_1.HttpStatus.OK.code,
                            httpStatus: httpResponse_1.HttpStatus.OK.status,
                            message: "User Successfuly Login",
                            data: { userData: response,
                                token, },
                        }));
                    }
                });
                // #endregion
            }
            else {
                return res
                    .status(400)
                    .send(new httpResponse_1.HTTPResponse({
                    statusCode: httpResponse_1.HttpStatus.OK.code,
                    httpStatus: httpResponse_1.HttpStatus.WARNING.status,
                    message: "Invalid Password!",
                }));
            }
        }
        else {
            console.log("User not found in DB");
            return res
                .status(400)
                .send(new httpResponse_1.HTTPResponse({
                statusCode: httpResponse_1.HttpStatus.OK.code,
                httpStatus: httpResponse_1.HttpStatus.WARNING.status,
                message: "Invalid user",
            }));
        }
    }))
        .catch((err) => {
        return res
            .status(400)
            .send(new httpResponse_1.HTTPResponse({
            statusCode: httpResponse_1.HttpStatus.WARNING.code,
            httpStatus: httpResponse_1.HttpStatus.WARNING.status,
            message: err,
        }));
    });
};
exports.CallToLoginUser = CallToLoginUser;
