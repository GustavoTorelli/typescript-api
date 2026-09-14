import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies?.access_token;

  if (!token) {
    res.status(401).json({ message: "unauthorized" });
    return;
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    res.status(500).json({ message: "JWT_SECRET not configured" });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (typeof decoded !== "object" || !decoded.sub) {
      res.status(401).json({ message: "Invalid Token" });
      return;
    }

    req.userId = decoded.sub;
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired Token" });
  }
}