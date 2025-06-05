import mongoose, { Schema, model, Document, Types } from "mongoose";

export interface TaskDocument extends Document{
    name:string,
    description?: string,
    priority:string,
    status:string,
    dueDate?: string,
    category?: string;
    createdBy: string;
}

const TaskSchema = new Schema<TaskDocument>(
    {
        name:{
            type:String,
            required:true,
            unique:true,
            trim: true,
        },
        description:{
            type:String,
        },
        priority:{
            type:String,
            enum:['low','medium','high'],
            required:true
        },
        status:{
            type:String,
            enum:['todo','inprogress','done'],
            required:true
        },
        dueDate:{
            type:String,
        },
        category:{
            type: String,
            ref:'Category',
        },
        createdBy:{
            type:String,
            ref:'User',
            required:true
        }
    },
    {
        timestamps:true,
    }
);

export const TaskModel = model<TaskDocument>('Task',TaskSchema);