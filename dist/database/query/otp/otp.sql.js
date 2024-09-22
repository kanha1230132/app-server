"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOtpQuery = exports.getOtpQuery = exports.deleteOtpQuery = exports.insertOtpQuery = void 0;
// insert otp query
exports.insertOtpQuery = `INSERT INTO otpTable (emailId, otp, otptype) VALUES ($1, $2, $3)`;
// delete otp query
exports.deleteOtpQuery = `DELETE FROM otpTable WHERE emailId = $1`;
// get otp query
exports.getOtpQuery = "SELECT * FROM otpTable WHERE emailId = $1 AND otp = $2";
// update otp query
exports.updateOtpQuery = `UPDATE otpTable SET otp = ?  WHERE emailId = ?`;
