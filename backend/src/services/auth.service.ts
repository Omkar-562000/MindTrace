import db from "../database/db";
import { AuthUser } from "../types/auth";
import { createAppError } from "../utils/app-error";
import { signToken } from "../utils/jwt";
import { hashPassword, verifyPassword } from "../utils/password";

interface UserRow extends AuthUser {
  password_hash: string;
}

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

const toAuthUser = (user: Pick<UserRow, "id" | "name" | "email">): AuthUser => ({
  id: user.id,
  name: user.name,
  email: user.email,
});

export const getUserByEmail = (email: string): UserRow | undefined => {
  return db
    .prepare("SELECT id, name, email, password_hash FROM users WHERE email = ?")
    .get(email) as UserRow | undefined;
};

export const getUserById = (id: number): AuthUser | undefined => {
  const user = db
    .prepare("SELECT id, name, email FROM users WHERE id = ?")
    .get(id) as AuthUser | undefined;

  return user;
};

export const registerUser = ({ name, email, password }: RegisterInput) => {
  const normalizedEmail = email.trim().toLowerCase();

  if (getUserByEmail(normalizedEmail)) {
    throw createAppError(409, "Email already registered");
  }

  const passwordHash = hashPassword(password);
  const result = db
    .prepare(
      "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
    )
    .run(name.trim(), normalizedEmail, passwordHash);

  const user = getUserById(Number(result.lastInsertRowid));

  if (!user) {
    throw createAppError(500, "Failed to create user");
  }

  return {
    token: signToken({ id: user.id }),
    user,
  };
};

export const loginUser = ({ email, password }: LoginInput) => {
  const normalizedEmail = email.trim().toLowerCase();
  const user = getUserByEmail(normalizedEmail);

  if (!user || !verifyPassword(password, user.password_hash)) {
    throw createAppError(401, "Invalid email or password");
  }

  return {
    token: signToken({ id: user.id }),
    user: toAuthUser(user),
  };
};
