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
exports.OtpQuery = void 0;
const init_1 = __importDefault(require("../../initialize/init"));
const otp_sql_1 = require("./otp.sql");
class OTPQuery {
    getOtp(emailId) {
        throw new Error("Method not implemented.");
    }
    /** insert user query
      @param emailId
      @param otp
      @param otpType
    */
    insertOtpQuery(emailId, otp, otpType) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.deleteOtpQuery(emailId);
            return new Promise((resolve, reject) => {
                init_1.default.query(otp_sql_1.insertOtpQuery, [emailId, otp, otpType], (err) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        reject(false);
                    }
                    else {
                        resolve(true);
                    }
                }));
            });
        });
    }
    /**
      @param emailId
    */
    deleteOtpQuery(emailId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                if (emailId) {
                    init_1.default.query(otp_sql_1.deleteOtpQuery, [emailId], (err, result) => {
                        if (err) {
                            //   logger.fatal(err);
                            resolve(false);
                        }
                        else {
                            const data = result.rows;
                            if (!data) {
                                resolve(false);
                                // logger.info("User Not Found");
                            }
                            //   logger.info(data.userId, "found user");
                            resolve(true);
                        }
                    });
                }
                else {
                    resolve(false);
                    return;
                }
            });
        });
    }
}
exports.OtpQuery = new OTPQuery();
