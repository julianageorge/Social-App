import express from "express"//@types/express 
import { config } from "dotenv";
import cors from "cors";
//config();
import { bootstrap } from "./app.controller";
import { InitSocket } from "./socket.io";

const app=express();
app.use(cors({origin:"*"}));
bootstrap(app,express);
const PORT=3000;
const server=app.listen(PORT,()=>{
console.log("Server running on Port",PORT);

});
InitSocket(server);


