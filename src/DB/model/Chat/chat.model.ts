import { model } from "mongoose";
import { ChatSchema } from "./chat.schema";

export const chat=model("Chat",ChatSchema);