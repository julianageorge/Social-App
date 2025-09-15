import { IUser } from "../../../utils/common/interface";
import { AbstractRepository } from "../../abstract.repositry";
import { User } from "./user.model";

export class UserRepository extends AbstractRepository<IUser>{

    constructor(){
        super(User)
    }
    async getAllUsers(){
        return await this.model.find();
    }
}