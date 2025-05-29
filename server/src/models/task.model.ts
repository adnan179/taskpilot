import mongoose, { Schema, model, Document, Types } from "mongoose";

export interface TaskDocument extends Document{
    name:string,
    description?: string,
    startDateTime: Date,
    endDateTime: Date,
    category?: Types.ObjectId;
    createdBy: string;
}

const TaskSchema = new Schema<TaskDocument>(
    {
        name:{
            type:String,
            required:true,
            trim: true,
        },
        description:{
            type:String,
        },
        startDateTime:{
            type:Date,
            required:true
        },
        endDateTime:{
            type:Date,
            required:true,
        },
        category:{
            type: Schema.Types.ObjectId,
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