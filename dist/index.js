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
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = require("./router/routes");
const cors_1 = __importDefault(require("cors"));
const auth_middleware_1 = require("./middleware/auth.middleware");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const init_1 = require("./database/initialize/init");
const socket_1 = require("./services/socket");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const EXPRESS_PORT = 4001;
// Use cookie-parser middleware
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://192.168.1.6:4001"]
}));
const httpServer = (0, http_1.createServer)(app);
app.use(auth_middleware_1.UserAuthenticate);
(0, routes_1.routes)(app);
// Use the separate function to handle socket events
const io = new socket_io_1.Server(httpServer);
(0, socket_1.handleSocketEvents)(io);
httpServer.listen(EXPRESS_PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    (0, init_1.getDatabase)();
    console.log("INFO :: Webserver started on port " + EXPRESS_PORT);
}));
