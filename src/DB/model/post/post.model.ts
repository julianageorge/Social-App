import { model } from "mongoose";
import { PostSchema } from "./post.schema";

export const Post=model("Post",PostSchema);