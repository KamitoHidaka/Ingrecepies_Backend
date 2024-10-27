import { Router } from "express";
import {
  signup,
  login,
  logout,
  profile,
  verifyToken,
} from "../controllers/auth.controller.js";

import { authRequired } from "../middlewares/authToken.js";

import { schemaAuthenticator } from "../middlewares/auth.middleware.js";

import { signupSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/signup", schemaAuthenticator(signupSchema), signup);
router.post("/login",  schemaAuthenticator(loginSchema), login);
router.get("/verify", verifyToken);
router.get("/profile", authRequired, profile);
router.post("/logout", verifyToken, logout);

export default router;
