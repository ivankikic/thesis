import express from "express";
import pool from "../db.js";
import { authenticateToken } from "../middleware/authorization.js";

const router = express.Router();

// Get all audit logs
router.get("/", authenticateToken, async (req, res) => {
  try {
    const auditLogs = await pool.query(
      "SELECT * FROM audit_logs ORDER BY date DESC"
    );
    res.json(auditLogs.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Filter audit logs by date range
router.get("/filter", authenticateToken, async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    let query = "SELECT * FROM audit_logs WHERE 1=1";
    const params = [];

    if (startDate) {
      params.push(startDate);
      query += ` AND date >= $${params.length}`;
    }

    if (endDate) {
      const endDateWithTime = new Date(
        new Date(endDate).setHours(23, 59, 59, 999)
      );
      params.push(endDateWithTime);
      query += ` AND date <= $${params.length}`;
    }

    query += " ORDER BY date DESC";

    const auditLogs = await pool.query(query, params);
    res.json(auditLogs.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a audit_log
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { user_id, log_type, data } = req.body;
    const newAuditLog = await pool.query(
      "INSERT INTO audit_logs (user_id, log_type, data) VALUES($1, $2, $3) RETURNING *",
      [user_id, log_type, data]
    );
    res.json(newAuditLog.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
