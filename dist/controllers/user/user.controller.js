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
exports.CallToVerifyOtp = exports.CallToVerifyEmailId = exports.CallToUserLogout = exports.CallToGetAllUsers = exports.CallToRegisterUser = void 0;
const database_1 = require("../../database");
const constant_1 = require("../../helper/constant");
const util_1 = require("../../helper/util");
const httpResponse_1 = require("../../httpResponse");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mail_1 = require("../../services/mail");
const otp_query_1 = require("../../database/query/otp/otp.query");
const otp_sql_1 = require("../../database/query/otp/otp.sql");
const init_1 = __importDefault(require("../../database/initialize/init"));
const { JWT_EXPIRE_TIME, COOKIEE_EXPIRE_TIME, JWT_SECRET, COOKIEE_SECRET_KEY } = constant_1.constants;
/**
 * Call Register User
 */
const CallToRegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { error } = util_1.registerValidation.validate(body);
    if (error) {
        return res.status(200).send(new httpResponse_1.HTTPResponse({
            statusCode: httpResponse_1.HttpStatus.WARNING.code,
            httpStatus: httpResponse_1.HttpStatus.WARNING.status,
            message: error.message,
        }));
    }
    if (body.password !== body.passwordConfirm) {
        return res.status(200).send(new httpResponse_1.HTTPResponse({
            statusCode: httpResponse_1.HttpStatus.WARNING.code,
            httpStatus: httpResponse_1.HttpStatus.WARNING.status,
            message: "Password does not match",
        }));
    }
    // const hashedPassword = await encryptPassword(body.password);
    const hashedPassword = body.password;
    const saveData = Object.assign(Object.assign({}, body), { password: hashedPassword });
    try {
        const data = yield database_1.UserQuery.insertUser(saveData);
        /** send  Registration  mail*/
        // sendRegisterationMail(data.firstName + " " + data.lastName,data.email)
        res.cookie(COOKIEE_SECRET_KEY, JSON.stringify(data), {
            maxAge: COOKIEE_EXPIRE_TIME,
        });
        jsonwebtoken_1.default.sign(data, JWT_SECRET, { expiresIn: JWT_EXPIRE_TIME }, (err, token) => {
            if (err) {
                res.status(500).send(new httpResponse_1.HTTPResponse({
                    statusCode: httpResponse_1.HttpStatus.INTERNAL_SERVER_ERROR.code,
                    httpStatus: httpResponse_1.HttpStatus.INTERNAL_SERVER_ERROR.status,
                    message: "Internal Server Error",
                }));
            }
            else {
                res.send(new httpResponse_1.HTTPResponse({
                    statusCode: httpResponse_1.HttpStatus.OK.code,
                    httpStatus: httpResponse_1.HttpStatus.OK.status,
                    message: "User created",
                    data: {
                        userData: data,
                        token,
                        clientCookieExpireTime: 2 / (24 * 60),
                        ClientCookieKey: "Skyd_Cookie_Team",
                    },
                }));
            }
        });
    }
    catch (err) {
        console.log("err ---------->", err.detail);
        res.send(new httpResponse_1.HTTPResponse({
            statusCode: httpResponse_1.HttpStatus.CONFLICT.code,
            httpStatus: httpResponse_1.HttpStatus.CONFLICT.status,
            // message:
            //   err?.code === "ER_DUP_ENTRY"
            //     ? "User already exist with this email"
            //     : err.message,
            message: err.detail
        }));
    }
    return;
});
exports.CallToRegisterUser = CallToRegisterUser;
/**
 * Get All Users
 */
const CallToGetAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pIndex } = req.body;
    const users = yield database_1.UserQuery.getAllUsers(pIndex | 0);
    console.log("users --->", users);
    return res.status(200).send(new httpResponse_1.HTTPResponse({
        statusCode: httpResponse_1.HttpStatus.OK.code,
        httpStatus: httpResponse_1.HttpStatus.OK.status,
        message: "Success",
        data: users,
    }));
});
exports.CallToGetAllUsers = CallToGetAllUsers;
/**
 * User Logout
 */
const CallToUserLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.CallToUserLogout = CallToUserLogout;
/**
 * User Register with Otp
 */
const CallToVerifyEmailId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).send((0, httpResponse_1.GetBadServerMessage)('Email parameter is required'));
        }
        const otp = (0, util_1.generateOTP)();
        const mailresponse = yield (0, mail_1.sendVerifyMail)(email, otp);
        if (mailresponse) {
            const status = yield otp_query_1.OtpQuery.insertOtpQuery(email, otp, "MailOtp");
            if (status) {
                return res.status(200).send((0, httpResponse_1.GetSuccessServerMessage)('OTP sent successfully'));
            }
            else {
                return res.status(500).send((0, httpResponse_1.GetInternalServerError)("INTERNAL_SERVER_ERROR"));
            }
        }
        else {
            return res.status(500).send((0, httpResponse_1.GetInternalServerError)('Error sending email'));
        }
    }
    catch (error) {
        return res.status(500).send((0, httpResponse_1.GetInternalServerError)("INTERNAL_SERVER_ERROR"));
    }
});
exports.CallToVerifyEmailId = CallToVerifyEmailId;
/**
 * Verify Otp
 */
const CallToVerifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    init_1.default.query(otp_sql_1.getOtpQuery, [email, otp], (error, results) => {
        if (error) {
            return res.status(500).send((0, httpResponse_1.GetInternalServerError)('Error verifying OTP'));
        }
        if (results.rowCount > 0) {
            init_1.default.query(otp_sql_1.deleteOtpQuery, [email], (delError) => {
                if (delError) {
                    return res.status(500).send((0, httpResponse_1.GetInternalServerError)('Error removing OTP'));
                }
                res.status(200).send((0, httpResponse_1.GetSuccessServerMessage)('OTP verified successfully'));
            });
        }
        else {
            res.status(400).send((0, httpResponse_1.GetBadServerMessage)('Invalid OTP'));
        }
    });
});
exports.CallToVerifyOtp = CallToVerifyOtp;
