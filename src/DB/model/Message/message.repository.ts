import { AbstractRepository } from "../../abstract.repositry";
import { IMessage } from "../../../utils";
import { message } from "./message.model";

export class MessageRepository extends AbstractRepository<IMessage>{
    constructor(){
        super(message)
    }
    
}
