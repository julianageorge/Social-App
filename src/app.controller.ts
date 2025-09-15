import { NextFunction, Response,Request, type Express } from "express";
import { AppError } from "./utils/error/index";
import { authRouter, userRouter } from "./module";
import { connectDB } from "./DB";
export  function bootstrap(app:Express,express:any) {
    connectDB();
    app.use(express.json());
    app.use("/auth",authRouter);
    app.use("/user",userRouter);
    app.use("/{*dummy}",(req,res,next)=>{
        return res.status(404).json({message:"Invalid router",success:false});
    });
    app.use((err:AppError,req:Request,res:Response,next:NextFunction)=>{
        return res.status(err.statusCode||500).json({message:err.message,errorDetails:err.errorDetails,success:false})

    })
    
}