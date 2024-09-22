"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = {
    GMAIL: process.env.GMAIL || "",
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD || "",
    POSTGRESS_SQL_URL: process.env.POSTGRESS_SQL_URL || ""
};
exports.default = env;
