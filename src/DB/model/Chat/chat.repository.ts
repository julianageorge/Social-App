import { AbstractRepository } from "../../abstract.repositry";
import { IChat } from "../../../utils";
import { chat } from "./chat.model";

export class ChatRepository extends AbstractRepository<IChat>{
    constructor(){
        super(chat)
    }
    
}
