//transactions.model.ts
import { Document, model, Schema } from "mongoose";

export interface TransactionDocument extends Document{
    name:string;
    description?: string;
    amount: number;
    category: Schema.Types.ObjectId;
    type: 'income' | 'expense';
    createdBy: string;
}

const TransactionSchema = new Schema<TransactionDocument>(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        description:{
            type:String,
        },
        amount:{
            type:Number,
            required:true
        },
        category:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:"budgetCategory"
        },
        type:{
            type: String,
            enum: ['income', 'expense'],
            required: true
        },
        createdBy:{
            type: String,
            ref:"User",
            required:true
        }
    },{
        timestamps:true
    }
);

export const TransactionModel = model<TransactionDocument>("transaction", TransactionSchema);
