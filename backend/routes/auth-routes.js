import express from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtTokens } from "../utils/jwt-helpers.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credentials");
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json("Invalid Credentials");
    }

    const tokens = jwtTokens(user.rows[0]);

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
    });
    const name = user.rows[0].name;
    const surname = user.rows[0].surname;
    const id = user.rows[0].id;
    const userData = {
      id,
      email,
      name,
      surname,
    };
    res.json({ userData, tokens });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/refresh_token", async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);

      const tokens = jwtTokens(user);
      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
      });
      res.json(tokens);
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, password, name, surname } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length > 0) {
      return res.status(401).json("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO users (email, password, name, surname) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, hashedPassword, name, surname]
    );
    const tokens = jwtTokens(newUser.rows[0]);
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
    });
    res.json({ email, name, surname, tokens });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/logout", (req, res) => {
  try {
    res.clearCookie("refreshToken");
    res.sendStatus(204);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

export default router;
