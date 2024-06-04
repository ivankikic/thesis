import express from "express";
import pool from "../db.js";
import { authenticateToken } from "../middleware/authorization.js";

const router = express.Router();

// get all sensors
router.get("/", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM sensors");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// get a sensor
router.get("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM sensors WHERE id = $1", [
      id,
    ]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// create a sensor
router.post("/", authenticateToken, async (req, res) => {
  const { name, type, location, sheet_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO sensors (name, type, location, sheet_id, rows_counter) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, type, location, sheet_id, 1]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// delete a sensor
router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM sensors WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// get row counter
router.get("/:id/rows_counter", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT rows_counter FROM sensors WHERE id = $1",
      [id]
    );
    res.status(200).json(result.rows[0].rows_counter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// reset row counter
router.put("/:id/rows_counter", authenticateToken, async (req, res) => {
  const { id, rows_counter } = req.body;
  try {
    const result = await pool.query(
      "UPDATE sensors SET rows_counter = $2 WHERE id = $1 RETURNING *",
      [id, rows_counter]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// increment row counter
router.put(
  "/:id/increment_rows_counter",
  authenticateToken,
  async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query(
        "UPDATE sensors SET rows_counter = rows_counter + 1 WHERE id = $1 RETURNING *",
        [id]
      );
      res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  }
);

export default router;
