import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'
import { devConfig } from '../../config/env/dev.config'

export const generateToken=({payload,secertKey=devConfig.SECRET_KEY!,options}:{payload:object,secertKey?:string,options?:SignOptions})=>{

return jwt.sign(payload,secertKey,options);
}

export const verifyToken=(token:string,secretKey:string=devConfig.SECRET_KEY!)=>{
    return jwt.verify(token,secretKey) as JwtPayload;
}