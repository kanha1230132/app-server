"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constants = void 0;
const JWT_SECRET = "skyd_group";
const POSTGRESS_SQL_URL = "postgresql://commondb_9eag_user:ufSFo4bSNH8hTsSpDu2JQhu75Xe3rUP9@dpg-crmq86t6l47c739ukesg-a.virginia-postgres.render.com/commondb_9eag";
const JWT_EXPIRE_TIME = '10h';
const COOKIEE_EXPIRE_TIME = 60 * 1000;
const COOKIEE_SECRET_KEY = "skyd@#1213";
const QUERY_PAGINATION = 1000;
exports.constants = {
    JWT_SECRET, POSTGRESS_SQL_URL,
    JWT_EXPIRE_TIME,
    COOKIEE_EXPIRE_TIME,
    COOKIEE_SECRET_KEY,
    QUERY_PAGINATION
};
