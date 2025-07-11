import { Request, Response } from "express";
import { TaskSchema } from "../schemas/task.schema";
import { TaskModel } from "../models/task.model";

//func to create task
export const createTask = async(req:Request, res:Response) => {
    const parsed = TaskSchema.safeParse(req.body);
    if(!parsed.success){
        console.log(parsed.error.flatten());
        return res.status(400).json({error:parsed.error.flatten()});
    }

    try{
        const task = new TaskModel(parsed.data);
        await task.save();
        res.status(200).json(task)
    }catch(err:any){
        console.log(err);
        res.status(500).json({error:`Failed to create task:${err.message}`})
    }
};

//func to get tasks
export const getTasks = async(req:Request, res:Response) => {
    try{
        const tasks = await TaskModel.find({createdBy:req.params.username}).sort({ createdAt:-1});
        if(!tasks) return res.status(404).json({error:"no tasks found!"})
        res.status(200).json(tasks);
    }catch(err:any){
        res.status(500).json({error:`Failed to fetch tasks:${err.message}`})
    }
};


//func to get task by using id
export const getTaskById = async(req:Request,res:Response) => {
    try{
        const task = await TaskModel.findById(req.params.id);
        if(!task) return res.status(404).json({error:"No task found!"});

        res.status(200).json(task)
    }catch(err:any){
        res.status(500).json({error:`Failed to fetch task:${err.message}`})
    }
}

//func to update the task by using id
export const updateTask = async(req:Request,res:Response) => {
    try{
        const updated = await TaskModel.findByIdAndUpdate(req.params.id, req.body,{new: true});
        if(!updated) return res.status(404).json({error:"no task found!"});

        res.status(200).json(updated)
    }catch(err:any){
        res.status(500).json({error:`Failed to update the task:${err.message}`})
    }
}

//func to delete task using id
export const deleteTask = async(req:Request, res: Response) => {
    try{
        const deleted = await TaskModel.findByIdAndDelete(req.params.id);
        if(!deleted) return res.status(404).json({ error: "Task not found!"});

        res.status(200).json({message:"Task deleted successfully", deleted});
    }catch(err:any){
        res.status(500).json({error:`failed to delete task:${err.message}`})
    }
};