import mongoose from "mongoose";
import { devConfig } from "../config/env/dev.config";
export const connectDB=()=>{
mongoose.connect(devConfig.DB_URL as string).then(()=>{
    console.log("DB connected successfully");
    
}).catch((err)=>{
console.log("fail to connect to DB",err);

});
}
