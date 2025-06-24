import express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import categoryRoutes from "./routes/category.route";
import taskRoutes from "./routes/task.route";
import authRoutes from "./routes/auth.route";
import budgetRoutes from "./routes/budget.route"
import cookieParser from "cookie-parser";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URL || "";

app.use(cors({
  origin: (origin, callback) => {
    // Allow all origins, but still enable credentials
    callback(null, origin || '*');
  },
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/categories", categoryRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/budget", budgetRoutes);

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