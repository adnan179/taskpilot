import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model";
import { RegisterSchema, LoginSchema } from "../schemas/auth.schema";

const JWT_SECRET = process.env.JWT_SECRET || "kasdnbcknAJ";
const COOKIE_NAME = 'auth-token';


export const register = async (req:Request, res: Response) => {
    const parsed = RegisterSchema.safeParse(req.body);
    if(!parsed.success) return res.status(400).json({error: parsed.error.flatten()});

    const { username, password } = parsed.data;

    try{
        const existingUser = await UserModel.findOne({ username});
        if(existingUser) return res.status(400).json({error: "Username already exists!"});

        const user = new UserModel({ username, password });
        await user.save()

        const token = jwt.sign({ userId: user._id, username:user.username}, JWT_SECRET, { expiresIn:"2d"});

        res
            .cookie(COOKIE_NAME,token,{
                httpOnly:true,
                secure:process.env.NODE_ENV === "production",
                sameSite:"strict",
                maxAge: 3600000*24
            })
            .status(201)
            .json({message:"User registered successfully", username});
    }catch(err:any){
        res.status(500).json({error:`Server error during registration:${err.message}`})
    }
};


export const login = async (req:Request, res:Response) => {
    const parsed = LoginSchema.safeParse(req.body);
    if(!parsed.success) return res.status(400).json({error:parsed.error.flatten()});

    const { username, password } = parsed.data;
    try{
        const user = await UserModel.findOne({ username });
        if(!user || user.password !== password){
            return res.status(401).json({ error: "Invalid Credentials"})
        }

        const token = jwt.sign({ userId:user._id, username:user.username}, JWT_SECRET, {expiresIn: "2d"});

        res
            .cookie(COOKIE_NAME, token, {
                httpOnly:true,
                secure:process.env.NODE_ENV === 'production',
                sameSite:"strict",
                maxAge: 3600000*24,
            })
            .status(200)
            .json({message:"Logged in successfully!",username})
    }catch(err:any){
        res.status(500).json({ error:  `server error during login:${err.message}`})
    }
};

export const logout = (_req:Request, res:Response) => {
    res
        .clearCookie(COOKIE_NAME,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:'strict'
        })
        .status(200)
        .json({ message:'Logged out successfully'})
};



