import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory
} from "../controllers/category.controller.js";

import { authRequired } from "../middlewares/authToken.js";

const router = Router();

router.get("/categories", getAllCategories);
router.get("/category/:id", authRequired, getCategoryById);
router.post("/category-creator", createCategory);
router.put("/category/:id",  authRequired, updateCategory);
router.delete("/category/:id", authRequired, deleteCategory);

export default router;
