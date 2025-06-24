import { Request, Response } from "express";
import { BudgetSchema } from "../schemas/budget.schema";
import { BudgetModel } from "../models/budget.model";

//func to create budget
export const createBudget = async(req:Request, res:Response) => {
    const parsed = BudgetSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(400).json({error:`budget schema error: ${parsed.error.flatten()}`})
    }

    try{
        const budget = new BudgetModel(parsed.data);
        await budget.save();
        res.status(200).json(budget)
    }catch(error:any){
        res.status(500).json({error:`Failed to create budget:${error.message}`})
    }
};

//func to get budgets using username
export const getBudgets = async(req:Request, res:Response) => {
    try{
        const username = req.params.username;
        const budgets = await BudgetModel.find({createdBy:username}).sort({createdAt:-1});
        if(!budgets) return res.status(404).json({error:"no budgets found!"});
        res.status(200).json(budgets);
    }catch(error:any){
        res.status(500).json({error:`Failed to fetch budgets: ${error.message}`})
    }
};

//func to get a budget using _id
export const getBudgetById = async(req:Request, res:Response) => {
    try{
        const budgetId = req.params.id;
        const budget = await BudgetModel.findOne({_id:budgetId});
        if(budget) return res.status(404).json({error:"No budget found!"});
        res.status(200).json(budget)
    }catch(error:any){
        res.status(500).json({error:`Failed to fetch budget: ${error.message}`})
    }
};

//func to update the budget by using id
export const updateBudgetById = async(req:Request, res:Response) => {
    try{
        const budgetId = req.params.id;
        const budget = await BudgetModel.findOneAndUpdate({_id:budgetId}, req.body, {new:true});
        if(!budget) return res.status(404).json({error:"No budget found!"});
        res.status(200).json(budget)
    }catch(error:any){
        res.status(500).json({error:`Failed to update budget: ${error.message}`})
    }
};

//func to delete the budget by using id
export const deleteBudgetById = async(req:Request, res:Response) => {
    try{
        const budgetId = req.params.id;
        const budget = await BudgetModel.findByIdAndDelete(budgetId);
        if(!budget) return res.status(404).json({error:"No budget found!"});

        res.status(200).json({message:"Budget deleted successfully!",budget})
    }catch(error:any){
        res.status(500).json({error:`Failed to delete budget: ${error.message}`})
    }
};
