//expenseBook.model.ts
import { Document, model, Schema } from "mongoose";

export interface ExpenseBookDocument extends Document{
    name:string;
    createdBy:string;
    transactions:[Schema.Types.ObjectId];
    totalAmount:number;
    budgetId:Schema.Types.ObjectId;
}

const ExpenseBookSchema = new Schema<ExpenseBookDocument>(
    {
        name:{
            type:String,
            required:true,
            trim:true,
        },
        createdBy:{
            type:String,
            ref:"User",
            required:true
        },
        transactions:[{
            type: Schema.Types.ObjectId,
            ref: "Transaction",
        }],
        totalAmount:{
            type:Number,
        },
        budgetId:{
            type:Schema.Types.ObjectId,
            ref:"budget",
        }

    }
);

ExpenseBookSchema.index({ name: 1, createdBy: 1 }, { unique: true });

export const ExpenseBookModel = model<ExpenseBookDocument>("expenseBook", ExpenseBookSchema);