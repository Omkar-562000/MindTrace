import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { getUserById, loginUser, registerUser } from "../services/auth.service";
import { createAppError } from "../utils/app-error";

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Valid email is required"),
  password: z.string().min(1, "Password is required"),
});

export const register = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const result = registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const login = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const result = loginUser(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const me = (req: Request, res: Response, next: NextFunction): void => {
  try {
    if (!req.user) {
      throw createAppError(401, "Authentication required");
    }

    const user = getUserById(req.user.id);

    if (!user) {
      throw createAppError(404, "User not found");
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
};
