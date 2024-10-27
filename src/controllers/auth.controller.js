import { HIDDEN_TOKEN } from "../config.js";
import { createAccessToken } from "../libs/jsontoken.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { userName, email, password, phoneNumber } = req.body;
  try {
    const userFound = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (userFound) {
      const message =
        userFound.email === email
          ? "El correo ya está registrado"
          : "El número de teléfono ya está en uso";
      return res.status(400).json({ errors: [message] });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      email,
      phoneNumber,
      password: hashPassword,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token, {
      secure: true,
      sameSite: "none",
    });

    return res.json({
      id: userSaved._id,
      userName: userSaved.userName,
      email: userSaved.email,
      creDate: userSaved.createdAt,
      upDate: userSaved.updatedAt,
    });
  } catch (error) {
    console.error("Error en el signup:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(404).json(["El usuario no existe"] );
    }

    const isPasswordValid = await bcrypt.compare(password, userFound.password);
    if (!isPasswordValid) {
      return res.status(400).json(["Contraseña incorrecta"]);
    }

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token, {
      secure: true,
      sameSite: "none",
    });

    return res.json({
      id: userFound._id,
      userName: userFound.userName,
      email: userFound.email,
    });
  } catch (error) {
    console.error("Error en el login:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  try {
    const userSaved = await User.findById(req.user.id);
    if (!userSaved) {
      return res.status(404).json({ message: "El usuario no existe" });
    }

    return res.json({
      id: userSaved._id,
      userName: userSaved.userName,
      email: userSaved.email,
      creDate: userSaved.createdAt,
      upDate: userSaved.updatedAt,
    });
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, HIDDEN_TOKEN, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};