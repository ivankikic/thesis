import express from "express";
import pool from "../db.js";
import { authenticateToken } from "../middleware/authorization.js";

const router = express.Router();

// Get all sensor logs with optional filters
router.get("/", authenticateToken, async (req, res) => {
  const { startDate, endDate, sensor_id } = req.query;
  let query = "SELECT * FROM sensor_logs WHERE 1=1";
  const params = [];

  if (startDate) {
    query += " AND created_at >= $1";
    params.push(startDate);
  }
  if (endDate) {
    const endDateWithTime = new Date(
      new Date(endDate).setHours(23, 59, 59, 999)
    );
    query += " AND created_at <= $2";
    params.push(endDateWithTime);
  }
  if (sensor_id) {
    query += " AND sensor_id = $3";
    params.push(sensor_id);
  }

  query += " ORDER BY created_at DESC";

  try {
    const result = await pool.query(query, params);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Create a sensor log
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { sensor_id, data } = req.body;
    const result = await pool.query(
      "INSERT INTO sensor_logs (sensor_id, data) VALUES ($1, $2) RETURNING *",
      [sensor_id, data]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
