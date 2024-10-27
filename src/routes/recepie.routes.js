import { Router } from "express";

import {
  createRecepie,
  getMyRecepies,
  getRecepieByName,
  getAllRecepies,
  deleteRecepie,
  updateRecepie,
} from "../controllers/recepie.controller.js";

import { authRequired } from "../middlewares/authToken.js";

import { schemaAuthenticator } from "../middlewares/auth.middleware.js";

import { recepieSchema } from "../schemas/recepie.schema.js";

const router = Router();

router.get("/", getAllRecepies);
router.get("/recepie/name", getRecepieByName);
router.post("/recepie-creator", authRequired,schemaAuthenticator(recepieSchema),createRecepie);
router.get("/my-recepies", authRequired, getMyRecepies);
router.put("/recepie/:id", authRequired, updateRecepie);
router.delete("/recepie/:id", authRequired, deleteRecepie);

export default router;
