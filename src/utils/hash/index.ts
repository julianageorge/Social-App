import bcrypt from "bcryptjs"
export const generateHash=(planText:string)=>{
    return bcrypt.hashSync(planText,10);
};
export const CompareHash=(Password:string,hashedPassword:string)=>{
    return bcrypt.compareSync(Password,hashedPassword);
};
