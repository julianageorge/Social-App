import { ObjectId } from "mongoose";
import { IAttechment, IReaction } from "../../../utils";

export class Comment{
        userId:ObjectId;
        postId:ObjectId;
        parentIds:ObjectId[];
        content:string;
        attachment?:IAttechment;
        reactions:IReaction[];
        mentions?:ObjectId[];
}