//budget.model.ts

import { Document, model, Schema } from "mongoose";

export interface BudgetCategory{
    name:string;
    amount:number;
}

export interface BudgetDocument extends Document{
    name:string;
    description?: string;
    totalAmount:number;
    createdBy:string;
    categories:BudgetCategory[]
}

const BudgetCategorySchema = new Schema<BudgetCategory>(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        amount:{
            type:Number,
            required:true
        }
    }
)

const BudgetSchema = new Schema<BudgetDocument>(
    {
       name:{
        type:String,
        required:true,
        trim:true,
       },
       description:{
        type:String,
        trim:true,
       },
       totalAmount:{
        type:Number,
        default:0,
        required:true
       },
       createdBy:{
        type:String,
        ref:"User",
        required:true
       },
       categories:{
        type:[BudgetCategorySchema],
        validate:[(val:BudgetCategory[]) => val.length > 0,"At least one category for per budget is required"]
       }
    },{
        timestamps:true
    }
);

//compute totalAmount from categories before saving
BudgetSchema.pre("save", function(next) {
    const budget = this as BudgetDocument;
    budget.totalAmount = budget.categories.reduce((acc,category) => acc + category.amount,0);
    next();
});

//checking if the budget name is unique for each user
BudgetSchema.index({ name:1, createdBy:1}, { unique:true})

export const BudgetModel = model<BudgetDocument>("budget",BudgetSchema)
