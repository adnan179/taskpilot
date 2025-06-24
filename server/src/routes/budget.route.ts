import { Router } from "express";
import {
    createBudget,
    getBudgets,
    getBudgetById,
    updateBudgetById,
    deleteBudgetById
} from "../controllers/budgetPlanner.controller";

const router = Router();

router.post("/",createBudget);
router.get("/:username", getBudgets);
router.get("/:id", getBudgetById);
router.put("/:id", updateBudgetById);
router.delete("/:id", deleteBudgetById);

export default router;