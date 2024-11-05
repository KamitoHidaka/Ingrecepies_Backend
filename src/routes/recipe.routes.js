import { Router } from "express";

import {
  createRecipe,
  getRecipeByName,
  getMyRecipes,
  getRecipeById,
  getAllRecipes,
  deleteRecipe,
  updateRecipe
} from "../controllers/recipe.controller.js";

import { authRequired } from "../middlewares/authToken.js";

import { schemaAuthenticator } from "../middlewares/auth.middleware.js";

import { recipeSchema } from "../schemas/recipe.schema.js";

const router = Router();


router.get("/home", getAllRecipes);
router.get("/recipe/name/:name", getRecipeByName);
router.get("/recipe/:id", getRecipeById );
router.post("/recipe-creator", authRequired,schemaAuthenticator(recipeSchema),createRecipe);
router.get("/my-recipes", authRequired, getMyRecipes);
router.put("/recipe-studio/:id", authRequired, updateRecipe);
router.delete("/recipe-trash/:id", authRequired, deleteRecipe);

export default router;
