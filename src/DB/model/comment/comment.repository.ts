import { Icomment } from "../../../utils";
import { AbstractRepository } from "../../abstract.repositry";
import { Comment } from "./comment.model";

export class CommentRepository extends AbstractRepository<Icomment>{
    constructor(){
        super(Comment);
    }
}