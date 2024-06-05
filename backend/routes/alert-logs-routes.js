import express from "express";
import pool from "../db.js";
import { authenticateToken } from "../middleware/authorization.js";

const router = express.Router();

// Get all sensor logs
router.get("/", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM alert_limits");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Create a sensor log
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { sensor_id, column_name, limit_value, sensor_value, type } =
      req.body;
    const result = await pool.query(
      "INSERT INTO alert_logs (sensor_id, column_name, limit_value, sensor_value, type) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [sensor_id, column_name, limit_value, sensor_value, type]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
