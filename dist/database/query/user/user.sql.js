"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserQuery = exports.getUserQuery = exports.getUserAllQuery = exports.createUserQuery = void 0;
const constant_1 = require("../../../helper/constant");
exports.createUserQuery = `INSERT INTO userTable 
(firstName, lastName, email, imageURL, createdBy, password, userType) 
VALUES($1, $2, $3, $4, $5, $6, $7);
`;
exports.getUserAllQuery = `SELECT * FROM userTable WHERE email = $1 OR userId = $2;`;
exports.getUserQuery = `SELECT userId, firstName, lastName, email, imageURL, createdAt, createdBy, deleted, deleteBy, userType 
FROM userTable WHERE deleted != TRUE AND (email = $1 OR userId = $2);`;
exports.getAllUserQuery = `
SELECT userId, firstName, lastName, email, imageURL, createdAt, createdBy, deleted, deleteBy, userType
FROM userTable
WHERE deleted != TRUE LIMIT ${constant_1.constants.QUERY_PAGINATION} OFFSET $1;
`;
