"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = {
    OK: { code: 200, status: "OK" },
    CREATED: { code: 201, status: "CREATED" },
    NO_CONTENT: { code: 204, status: "NO_CONTENT" },
    BAD_REQUEST: { code: 400, status: "BAD_REQUEST" },
    NOT_FOUND: { code: 404, status: "NOT_FOUND" },
    INTERNAL_SERVER_ERROR: { code: 500, status: "INTERNAL_SERVER_ERROR" },
    WARNING: { code: 200, status: "WARNING" },
    DATABASE_ERROR: { code: 502, status: "DATABASE_ERROR" },
    UN_AUTHORISED: { code: 401, status: "ALERT" },
    CONFLICT: { code: 409, status: "CONFLICT" },
    PAYLOAD_TOO_LARGE: { code: 413, status: "CONTENT_TOO_LARGE" }
};
exports.default = HttpStatus;
