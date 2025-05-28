import express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import categoryRoutes from "./routes/category.route";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URL || "";

app.use(cors());
app.use(express.json());

app.use("/api/categories", categoryRoutes);

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB!!");
        app.listen(PORT,() => {
            console.log(`Server running on http://localhost:${PORT}`)
        })
    })
    .catch((error) => {
        console.log("MongoDB connection failed",error.message);
        process.exit(1);
    })