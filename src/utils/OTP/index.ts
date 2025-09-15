export const generateOtp=():string=>{
return Math.floor(Math.random()*99999+10000)as unknown as string;
}

export const generateExpireyDate=(time:number)=>{
    return Date.now()+time;

}