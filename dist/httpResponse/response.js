"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// interface ResponseConstructor extends IResponseInput{
//   timeStamp: string;
// }
class HTTPResponse {
    constructor(params) {
        this.timeStamp = new Date().toString();
        this.httpStatus = params.httpStatus;
        this.statusCode = params.statusCode;
        this.message = params.message;
        this.data = params.data;
    }
}
exports.default = HTTPResponse;
