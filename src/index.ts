import express from "express"//@types/express 
import { config } from "dotenv";
config({path:"./config/dev.env"})
import { bootstrap } from "./app.controller";

const app=express();
bootstrap(app,express);
const PORT=3000;
app.listen(PORT,()=>{
console.log("Server running on Port",PORT);

})