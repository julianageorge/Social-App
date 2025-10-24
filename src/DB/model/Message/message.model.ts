import { model } from "mongoose";
import { MessageSchema } from "./message.schema";

export const message=model("Message",MessageSchema);