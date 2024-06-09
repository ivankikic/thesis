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
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const dashboard = await pool.query(
      "SELECT * FROM dashboards WHERE id = $1",
      [id]
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
      const result = await pool.query("SELECT MAX(id) FROM dashboards");
      nextId = result.rows[0].max + 1;
      do {
        dashboardName = `Dashboard_${nextId}`;
        existingDashboard = await pool.query(
          "SELECT * FROM dashboards WHERE name = $1",
          [dashboardName]
        );
        if (existingDashboard.rows.length > 0) {
          nextId++;
        }
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

    if (originalDashboard.rows.length === 0) {
      return res.status(404).json({ error: "Dashboard not found" });
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

// Update dashboard order
router.put("/:id/order", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;

    const updatedDashboard = await pool.query(
      'UPDATE "dashboards" SET data = $1 WHERE id = $2 RETURNING *',
      [data, id]
    );

    res.json(updatedDashboard.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update included columns for a dashboard item
router.put("/:id/columns", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { itemId, includedColumns } = req.body;

    const dashboard = await pool.query(
      "SELECT * FROM dashboards WHERE id = $1",
      [id]
    );

    if (dashboard.rows.length === 0) {
      return res.status(404).json({ error: "Dashboard not found" });
    }

    const updatedData = dashboard.rows[0].data.map((item) =>
      item.id === itemId
        ? {
            ...item,
            dashboard_data: {
              ...item.dashboard_data,
              included_columns: includedColumns,
            },
          }
        : item
    );

    const updatedDashboard = await pool.query(
      'UPDATE "dashboards" SET data = $1 WHERE id = $2 RETURNING *',
      [JSON.stringify(updatedData), id]
    );

    res.json(updatedDashboard.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update dashboard type for a dashboard item
router.put("/:id/type", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { itemId, dashboardType } = req.body;

    const dashboard = await pool.query(
      "SELECT * FROM dashboards WHERE id = $1",
      [id]
    );

    if (dashboard.rows.length === 0) {
      return res.status(404).json({ error: "Dashboard not found" });
    }

    const updatedData = dashboard.rows[0].data.map((item) =>
      item.id === itemId
        ? {
            ...item,
            dashboard_data: {
              ...item.dashboard_data,
              dashboard_type: dashboardType,
            },
          }
        : item
    );

    const updatedDashboard = await pool.query(
      'UPDATE "dashboards" SET data = $1 WHERE id = $2 RETURNING *',
      [JSON.stringify(updatedData), id]
    );

    res.json(updatedDashboard.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a dashboard tile
router.post("/:id/tiles", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, sheet_id } = req.body;

    const dashboard = await pool.query(
      "SELECT * FROM dashboards WHERE id = $1",
      [id]
    );
    if (dashboard.rows.length === 0) {
      return res.status(404).json({ error: "Dashboard not found" });
    }

    const sheet = await pool.query("SELECT * FROM sheets WHERE id = $1", [
      sheet_id,
    ]);
    if (sheet.rows.length === 0) {
      return res.status(404).json({ error: "Sheet not found" });
    }

    const filteredColumns = sheet.rows[0].columns.filter(
      (col) => col.toLowerCase() !== "date" && col.toLowerCase() !== "datetime"
    );

    const included_columns = filteredColumns.slice(0, 2);
    const order = dashboard.rows[0].data.length + 1;

    const newTile = {
      id: Date.now(),
      name,
      sheet_id,
      dashboard_data: {
        order,
        chart_type: "bar",
        dashboard_type: "1:2",
        included_columns,
      },
    };

    const updatedData = [...dashboard.rows[0].data, newTile];

    const updatedDashboard = await pool.query(
      'UPDATE "dashboards" SET data = $1 WHERE id = $2 RETURNING *',
      [JSON.stringify(updatedData), id]
    );

    res.json(updatedDashboard.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update chart type for a dashboard item
router.put("/:id/chart-type", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { itemId, chartType } = req.body;

    const dashboard = await pool.query(
      "SELECT * FROM dashboards WHERE id = $1",
      [id]
    );

    if (dashboard.rows.length === 0) {
      return res.status(404).json({ error: "Dashboard not found" });
    }

    const updatedData = dashboard.rows[0].data.map((item) =>
      item.id === itemId
        ? {
            ...item,
            dashboard_data: {
              ...item.dashboard_data,
              chart_type: chartType,
            },
          }
        : item
    );

    const updatedDashboard = await pool.query(
      'UPDATE "dashboards" SET data = $1 WHERE id = $2 RETURNING *',
      [JSON.stringify(updatedData), id]
    );

    res.json(updatedDashboard.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
