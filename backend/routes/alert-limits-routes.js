import express from "express";
import pool from "../db.js";
import { authenticateToken } from "../middleware/authorization.js";

const router = express.Router();

// Get all alert limits
router.get("/", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM alert_limits");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Create a alert limit
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { sensor_id, data } = req.body;
    const result = await pool.query(
      "INSERT INTO alert_limits (sensor_id, data) VALUES ($1, $2) RETURNING *",
      [sensor_id, data]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Update a alert limit
router.put("/", authenticateToken, async (req, res) => {
  try {
    const { sensor_id, data } = req.body;
    const result = await pool.query(
      "UPDATE alert_limits SET data = $2 WHERE sensor_id = $1 RETURNING *",
      [sensor_id, data]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
