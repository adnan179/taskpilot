import { CategoryModel } from "../models/category.model";
import { CategorySchema } from "../schemas/category.schema";
import { Request,Response } from "express";

//function to create categories
export const createCategory = async (req: Request, res: Response) => {
    const parsed = CategorySchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(400).json({error:parsed.error.flatten()});
    }

    try{
        const category = new CategoryModel(parsed.data);
        await category.save()
        res.status(201).json(category)
    }catch(err){
        res.status(500).json({error:"Server error while creating category"});
    }
};

//function to get categories
export const getCategories = async(_req:Request, res:Response) => {
    try{
        const categories = await CategoryModel.find().sort({createdAt:-1});
        res.status(200).json(categories)
    }catch(err:any){
        res.status(500).json({error:`Failed to fetch categories:${err.message}`})
    }
};


//function to get category using id
export const getCategoryById = async(req:Request,res:Response) => {
    try{
        const category = await CategoryModel.findById(req.params.id);
        if(!category) return res.status(404).json({error:"Catgeory not found!"});
        res.status(200).json(category)
    }catch(err:any){
        res.status(500).json({error:`Failed to get category:${err.message}`})
    }
};


//function to update category 
export const updateCategory = async(req:Request, res:Response) => {
    const parsed = CategorySchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(400).json({error:parsed.error.flatten()})
    }

    try{
        const updated = await CategoryModel.findByIdAndUpdate(req.params.id, parsed.data,{ new: true});
        if(!updated) return res.status(404).json({error:"Category not found!"});

        res.status(200).json(updated);
    }catch(err:any){
        res.status(500).json({error:`Failed to update category:${err.message}`})
    }
}

//function to delete categories
export const deleteCategory = async(req:Request,res:Response) => {
    try{
        const deleted = await CategoryModel.findByIdAndDelete(req.params.id);
        if(!deleted) return res.status(404).json({error: "Category not found!"});

        res.status(200).json({message:"Category deleted Successfully!",deleted})
    }catch(err:any){
        res.status(500).json({error:`Failed to delete the category:${err.message}`})
    }
}