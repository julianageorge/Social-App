import { ObjectId } from "mongoose";
import { IAttechment, IReaction } from "../../../utils";

export class Post{
    userId:ObjectId;
    content:string;
    reactions:IReaction[];
    attachment?:IAttechment[];
}