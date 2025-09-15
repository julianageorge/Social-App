import {email, z} from "zod";
import { LoginDto, RegisterDto } from "./auth.dto";
import { GENDER } from "../../utils";
export const RegisterSchema =z.object<RegisterDto>({
    fullName:z.string().min(2).max(20) as unknown as string,
    email:z.email() as unknown as string,
    password:z.string() as unknown as string,
    phonrNumber:z.string().optional() as unknown as string,
    gender:z.enum(GENDER) as unknown as GENDER

});
export const LoginSchema=z.object<LoginDto>({
    email:z.email() as unknown as string,
    password:z.string() as unknown as string,
})
