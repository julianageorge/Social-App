import { config } from "dotenv";
config();
export const devConfig={

DB_URL:process.env.DB_URL,

SECRET_KEY:process.env.SECRET_KEY,

EMAIL:process.env.EMAIL,
PASSWORD:process.env.PASSWORD,

}