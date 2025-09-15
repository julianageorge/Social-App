import { Schema } from 'mongoose';
import { NextFunction, Request, Response } from "express"
import { BadRequestException } from "../utils"
import {  ZodType } from 'zod';

export const isValid=(schema:ZodType)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        let data={...req.body,...req.params,...req.query}
        const result=schema.safeParse(data);


        if(result.success==false){ 
            let errorMessage=result.error?.issues.map((issue)=>({
            path:issue.path[0] ,
            message:issue.message 
        }));
        
            throw new BadRequestException("validation failed!",errorMessage);
        }
         next();
    }

}