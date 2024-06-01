import express from "express";
import pool from "../db.js";
import { authenticateToken } from "../middleware/authorization.js";

const router = express.Router();

// Get all dashboards
router.get("/", authenticateToken, async (req, res) => {
  try {
    const dashboards = await pool.query("SELECT * FROM dashboards");
    res.json(dashboards.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a dashboard
router.get("/:name", authenticateToken, async (req, res) => {
  try {
    const { name } = req.params;
    const dashboard = await pool.query(
      "SELECT * FROM dashboards WHERE name = $1",
      [name]
    );
    res.json(dashboard.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a dashboard
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { name, data } = req.body;

    let dashboardName;
    if (name && data) {
      const existingDashboard = await pool.query(
        "SELECT * FROM dashboards WHERE name = $1",
        [name]
      );
      if (existingDashboard.rows.length > 0) {
        return res
          .status(400)
          .json({ error: "ERROR_DASHBOARD_ALREADY_EXISTS" });
      }
      dashboardName = name;
    } else {
      let nextId;
      let existingDashboard;
      do {
        const result = await pool.query("SELECT MAX(id) FROM dashboards");
        nextId = result.rows[0].max + 1;
        dashboardName = `dashboard_${nextId}`;

        existingDashboard = await pool.query(
          "SELECT * FROM dashboards WHERE name = $1",
          [dashboardName]
        );
      } while (existingDashboard.rows.length > 0);
    }

    const dashboard = await pool.query(
      'INSERT INTO "dashboards" (name, data) VALUES ($1, $2) RETURNING *',
      [dashboardName, data || []]
    );

    res.json(dashboard.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a dashboard
router.put("/:name", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, data } = req.body;

    const existingDashboard = await pool.query(
      "SELECT * FROM dashboards WHERE name = $1 AND id != $2",
      [name, id]
    );
    if (existingDashboard.rows.length > 0) {
      return res.status(400).json({ error: "ERROR_DASHBOARD_ALREADY_EXISTS" });
    }

    const dashboard = await pool.query(
      'UPDATE "dashboards" SET name = $1, data = $2 WHERE id = $3 RETURNING *',
      [name, data, id]
    );
    res.json(dashboard.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rename a dashboard
router.put("/:id/rename", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { newName } = req.body;

    if (!newName || newName.trim() === "") {
      return res.status(400).json({ error: "ERROR_EMPTY_DASHBOARD_NAME" });
    }

    const existingDashboard = await pool.query(
      "SELECT * FROM dashboards WHERE name = $1 AND id != $2",
      [newName, id]
    );
    if (existingDashboard.rows.length > 0) {
      return res.status(400).json({ error: "ERROR_DASHBOARD_ALREADY_EXISTS" });
    }

    const dashboard = await pool.query(
      'UPDATE "dashboards" SET name = $1 WHERE id = $2 RETURNING *',
      [newName, id]
    );
    res.json(dashboard.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Duplicate a dashboard
router.post("/:id/duplicate", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const originalDashboard = await pool.query(
      "SELECT * FROM dashboards WHERE id = $1",
      [id]
    );

    if (originaldashboard.rows.length === 0) {
      return res.status(404).json({ error: "dashboard not found" });
    }

    const { name, data } = originalDashboard.rows[0];
    const newName = `${name}_copy`;

    const existingDashboard = await pool.query(
      "SELECT * FROM dashboards WHERE name = $1",
      [newName]
    );

    if (existingDashboard.rows.length > 0) {
      return res.status(400).json({
        error: "ERROR_DASHBOARD_ALREADY_EXISTS_WITH_NAME",
        name: newName,
      });
    }

    const duplicatedDashboard = await pool.query(
      'INSERT INTO "dashboards" (name, data) VALUES ($1, $2) RETURNING *',
      [newName, data]
    );

    res.json(duplicatedDashboard.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a dashboard
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM dashboards WHERE id = $1", [id]);
    res.json({ message: "TOAST_SUCCESS_DELETE_DASHBOARD" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
