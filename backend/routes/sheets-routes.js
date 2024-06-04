import express from "express";
import pool from "../db.js";
import { authenticateToken } from "../middleware/authorization.js";

const router = express.Router();

// Get all sheets
router.get("/", authenticateToken, async (req, res) => {
  try {
    const sheets = await pool.query("SELECT * FROM sheets ORDER BY name ASC");
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
    const { name, rows, columns } = req.body;

    let sheetName;
    if (name && rows && columns) {
      const existingSheet = await pool.query(
        "SELECT * FROM sheets WHERE name = $1",
        [name]
      );
      if (existingSheet.rows.length > 0) {
        return res.status(400).json({ error: "ERROR_SHEET_ALREADY_EXISTS" });
      }
      sheetName = name;
    } else {
      let nextId;
      let existingSheet;
      do {
        const result = await pool.query("SELECT MAX(id) FROM sheets");
        nextId = result.rows[0].max + 1;
        sheetName = `Sheet_${nextId}`;

        existingSheet = await pool.query(
          "SELECT * FROM sheets WHERE name = $1",
          [sheetName]
        );
      } while (existingSheet.rows.length > 0);
    }

    const sheet = await pool.query(
      'INSERT INTO "sheets" (name, rows, columns) VALUES ($1, $2, $3) RETURNING *',
      [sheetName, rows || [], columns || []]
    );

    res.json(sheet.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a sheet
router.put("/:name", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, rows, columns } = req.body;

    const existingSheet = await pool.query(
      "SELECT * FROM sheets WHERE name = $1 AND id != $2",
      [name, id]
    );
    if (existingSheet.rows.length > 0) {
      return res.status(400).json({ error: "ERROR_SHEET_ALREADY_EXISTS" });
    }

    const sheet = await pool.query(
      'UPDATE "sheets" SET name = $1, rows = $2, columns = $3 WHERE id = $4 RETURNING *',
      [name, rows, columns, id]
    );
    res.json(sheet.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rename a sheet
router.put("/:id/rename", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { newName } = req.body;

    if (!newName || newName.trim() === "") {
      return res.status(400).json({ error: "ERROR_EMPTY_SHEET_NAME" });
    }

    const existingSheet = await pool.query(
      "SELECT * FROM sheets WHERE name = $1 AND id != $2",
      [newName, id]
    );
    if (existingSheet.rows.length > 0) {
      return res.status(400).json({ error: "ERROR_SHEET_ALREADY_EXISTS" });
    }

    const sheet = await pool.query(
      'UPDATE "sheets" SET name = $1 WHERE id = $2 RETURNING *',
      [newName, id]
    );
    res.json(sheet.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Duplicate a sheet
router.post("/:id/duplicate", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const originalSheet = await pool.query(
      "SELECT * FROM sheets WHERE id = $1",
      [id]
    );

    if (originalSheet.rows.length === 0) {
      return res.status(404).json({ error: "Sheet not found" });
    }

    const { name, rows, columns } = originalSheet.rows[0];
    const newName = `${name}_copy`;

    const existingSheet = await pool.query(
      "SELECT * FROM sheets WHERE name = $1",
      [newName]
    );

    if (existingSheet.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "ERROR_SHEET_ALREADY_EXISTS_WITH_NAME", name: newName });
    }

    const duplicatedSheet = await pool.query(
      'INSERT INTO "sheets" (name, rows, columns) VALUES ($1, $2, $3) RETURNING *',
      [newName, rows, columns]
    );

    res.json(duplicatedSheet.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a sheet
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM sheets WHERE id = $1", [id]);
    res.json({ message: "TOAST_SUCCESS_DELETE_SHEET" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check if name already exists
router.post("/check-name", authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;
    const existingSheet = await pool.query(
      "SELECT * FROM sheets WHERE name = $1",
      [name]
    );
    res.json(existingSheet.rows.length !== 0);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
