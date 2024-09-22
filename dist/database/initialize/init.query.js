"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserTable = void 0;
exports.createUserTable = `CREATE TABLE IF NOT EXISTS userTable (
    userId BIGSERIAL PRIMARY KEY,
    firstName VARCHAR(255) DEFAULT NULL,
    lastName VARCHAR(255) DEFAULT NULL,
    email VARCHAR(255) DEFAULT NULL UNIQUE,
    imageURL VARCHAR(255) DEFAULT NULL,
    createdBy BIGINT DEFAULT NULL,
    deleted BOOLEAN NOT NULL DEFAULT FALSE,
    userType INT NOT NULL DEFAULT 0,
    password VARCHAR(255) NOT NULL,
    deleteBy BIGINT DEFAULT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`;
