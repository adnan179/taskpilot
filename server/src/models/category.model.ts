import { Schema, model, Document } from "mongoose";

export interface CategoryDocument extends Document{
    name:string;
}

const CategorySchema = new Schema<CategoryDocument>(
    {
        name:{
            type:String,
            required:true,
            trim:true,
        }
    },
    {
        timestamps:true,
    }
);

export const CategoryModel = model<CategoryDocument>("Category",CategorySchema);