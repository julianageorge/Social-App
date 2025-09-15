import mongoose from "mongoose";
export const connectDB=()=>{
mongoose.connect(process.env.DB_URL as string).then(()=>{
    console.log("DB connected successfully");
    
}).catch((err)=>{
console.log("fail to connect to DB",err);

});
}
