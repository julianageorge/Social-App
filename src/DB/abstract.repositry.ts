import { MongooseUpdateQueryOptions, QueryOptions, UpdateQuery } from "mongoose";
import { Model, ProjectionType, RootFilterQuery } from "mongoose";

export abstract class AbstractRepository<T>{
    constructor(protected model:Model<T>){}
    async create(item:Partial<T>){
    const document=new this.model(item);
    return await document.save();
    }
   async update( filter:RootFilterQuery<T>,
        update:UpdateQuery<T>,
        options?:MongooseUpdateQueryOptions<T>){
        await this.model.updateOne(filter,update,options);
    }

    async getOne( 
        filter:RootFilterQuery<T>,
        projection?:ProjectionType<T>,
        options?:QueryOptions<T>
    ){
        return await this.model.findOne(filter,projection,options)
    }

    async exist( 
        filter:RootFilterQuery<T>,
        projection?:ProjectionType<T>,
        options?:QueryOptions<T>
    ){
        return await this.model.findOne(filter,projection,options)
    }
    async delete(filter:RootFilterQuery<T>){
        await this.model.deleteOne(filter)
    }
}