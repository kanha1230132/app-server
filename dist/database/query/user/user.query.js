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
exports.UserQuery = void 0;
const init_1 = __importDefault(require("../../initialize/init"));
const user_sql_1 = require("./user.sql");
const constant_1 = require("../../../helper/constant");
class UserModalQuery {
    insertUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                init_1.default.query(user_sql_1.createUserQuery, [
                    user.firstName,
                    user === null || user === void 0 ? void 0 : user.lastName,
                    user.email,
                    user === null || user === void 0 ? void 0 : user.imageURL,
                    user === null || user === void 0 ? void 0 : user.createdBy,
                    user.password,
                    (user === null || user === void 0 ? void 0 : user.userType) || 0,
                ], (err) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.log(err.message);
                        reject(err);
                    }
                    else {
                        const userId = user.userId;
                        console.log({ createdUserId: userId }, "user created");
                        const userData = yield this.getUser(userId, user.email);
                        if (userData) {
                            resolve(userData);
                        }
                        else {
                            reject("Something went wrong! user not created");
                        }
                    }
                }));
            });
        });
    }
    getUser(userId, email, getPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (userId || email) {
                    init_1.default.query(getPassword ? user_sql_1.getUserAllQuery : user_sql_1.getUserQuery, [email, userId], (err, result) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        }
                        else {
                            console.log("result=========>", result);
                            const data = result.rows[0];
                            if (!data) {
                                reject("User Not Found");
                                console.log("User Not Found");
                            }
                            console.log(data === null || data === void 0 ? void 0 : data.userid, "found user");
                            resolve(data);
                        }
                    });
                }
                else {
                    reject("incorrect input: userId and email can not be null");
                    return;
                }
            });
        });
    }
    getAllUsers(pIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                init_1.default.query(user_sql_1.getAllUserQuery, [pIndex * constant_1.constants.QUERY_PAGINATION], (err, result) => {
                    if (err) {
                        console.log(err);
                        reject(undefined);
                    }
                    else {
                        const data = result.rows;
                        if (!data) {
                            console.log("data Not Found");
                            reject(undefined);
                        }
                        console.log(data, "All Users data ");
                        resolve(data);
                    }
                });
            });
        });
    }
}
exports.UserQuery = new UserModalQuery();
