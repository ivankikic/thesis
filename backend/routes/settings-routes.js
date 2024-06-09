import express from "express";
import pool from "../db.js";
import { authenticateToken } from "../middleware/authorization.js";

const router = express.Router();

router.get("/language", async (req, res) => {
  try {
    const language = await pool.query(
      "SELECT * FROM settings WHERE name = 'language'"
    );
    res.json(language.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/language", authenticateToken, async (req, res) => {
  try {
    const { language } = req.body;
    await pool.query("UPDATE settings SET value = $1 WHERE name = 'language'", [
      language,
    ]);
    res.json({ message: "Language updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/email", async (req, res) => {
  try {
    const email = await pool.query(
      "SELECT * FROM settings WHERE name = 'email'"
    );
    res.json(email.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
