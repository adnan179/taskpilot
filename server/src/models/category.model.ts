import { Schema, model, Document } from "mongoose";

export interface CategoryDocument extends Document{
    name:string;
    color:string;
    createdBy:string;
}

const CategorySchema = new Schema<CategoryDocument>(
    {
        name:{
            type:String,
            required:true,
            trim:true,
        },
        color:{
            type:String,
            required:true,
        },
        createdBy:{
            type: String,
            ref:"User",
            required:true
        }
    },
    {
        timestamps:true,
    }
);

export const CategoryModel = model<CategoryDocument>("Category",CategorySchema);