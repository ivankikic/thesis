import express from "express";
import pool from "../db.js";
import { authenticateToken } from "../middleware/authorization.js";

const router = express.Router();

// Get all sheets
router.get("/", authenticateToken, async (req, res) => {
  try {
    const sheets = await pool.query("SELECT * FROM sheets");
    res.json(sheets.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a sheet
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const sheet = await pool.query("SELECT * FROM sheets WHERE id = $1", [id]);
    res.json(sheet.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a sheet
router.post("/", authenticateToken, async (req, res) => {
  try {
    const sheet = await pool.query(
      'INSERT INTO "sheets" (name, rows, columns) VALUES ($1, $2, $3) RETURNING *',
      [`Sheet ${sheet.rows[0].id}`, [], []]
    );
    res.json(sheet.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a sheet
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, rows, columns } = req.body;
    const sheet = await pool.query(
      'UPDATE "sheets" SET name = $1, rows = $2, columns = $3 WHERE id = $4 RETURNING *',
      [name, rows, columns, id]
    );
    res.json(sheet.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
