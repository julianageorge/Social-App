import { IPost } from "../../../utils";
import { AbstractRepository } from "../../abstract.repositry";
import { Post } from "./post.model";

export class PostRepository extends AbstractRepository<IPost>{
    constructor(){
        super(Post);
    }
}