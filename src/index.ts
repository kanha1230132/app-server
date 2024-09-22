import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { routes } from "./router/routes";
import cors from "cors";
import {UserAuthenticate} from './middleware/auth.middleware'
import { createServer } from "http";
import { Server } from "socket.io";
import { getDatabase } from "./database/initialize/init";
import { handleSocketEvents } from "./services/socket";
import { PathName } from "./router/pathName";

const app = express();
app.use(express.json());
const EXPRESS_PORT =  4001;

// Use cookie-parser middleware
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: ["http://192.168.1.6:4001"]
}));
const httpServer = createServer(app);

app.use(UserAuthenticate);
routes(app);
// Use the separate function to handle socket events
  const io = new Server(httpServer);
  handleSocketEvents(io);







httpServer.listen(EXPRESS_PORT, async () => {
  getDatabase();
  console.log("INFO :: Webserver started on port " + EXPRESS_PORT);
});
