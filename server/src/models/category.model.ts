import mongoose, { Schema, model, Document } from "mongoose";

export interface CategoryDocument extends Document{
    name:string;
    createdBy:string;
}

const CategorySchema = new Schema<CategoryDocument>(
    {
        name:{
            type:String,
            required:true,
            trim:true,
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