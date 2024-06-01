import express from "express";
import pool from "../db.js";
import { authenticateToken } from "../middleware/authorization.js";

const router = express.Router();

// Get all connections
router.get("/", authenticateToken, async (req, res) => {
  try {
    const connections = await pool.query("SELECT * FROM connections");
    res.json(connections.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a connection
router.get("/:name", authenticateToken, async (req, res) => {
  try {
    const { name } = req.params;
    const connection = await pool.query(
      "SELECT * FROM connections WHERE name = $1",
      [name]
    );
    res.json(connection.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a connection
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { name, sheetId, status } = req.body;

    let connectionName;
    if (name && sheetId && status) {
      const existingConnection = await pool.query(
        "SELECT * FROM connections WHERE name = $1",
        [name]
      );
      if (existingConnection.rows.length > 0) {
        return res
          .status(400)
          .json({ error: "ERROR_CONNECTION_ALREADY_EXISTS" });
      }
      connectionName = name;
    } else {
      let nextId;
      let existingConnection;
      do {
        const result = await pool.query("SELECT MAX(id) FROM connections");
        nextId = result.rows[0].max + 1;
        connectionName = `connection_${nextId}`;

        existingConnection = await pool.query(
          "SELECT * FROM connections WHERE name = $1",
          [connectionName]
        );
      } while (existingConnection.rows.length > 0);
    }

    const connection = await pool.query(
      'INSERT INTO "connections" (name, sheet_id, status) VALUES ($1, $2, $3) RETURNING *',
      [connectionName, sheetId, status]
    );

    res.json(connection.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a connection
router.put("/:name", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, sheetId, status } = req.body;

    const existingConnection = await pool.query(
      "SELECT * FROM connections WHERE name = $1 AND id != $2",
      [name, id]
    );
    if (existingConnection.rows.length > 0) {
      return res.status(400).json({ error: "ERROR_CONNECTION_ALREADY_EXISTS" });
    }

    const connection = await pool.query(
      'UPDATE "connections" SET name = $1, sheet_id = $2, status = $3 WHERE id = $4 RETURNING *',
      [name, sheetId, status, id]
    );
    res.json(connection.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rename a connection
router.put("/:id/rename", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { newName } = req.body;

    if (!newName || newName.trim() === "") {
      return res.status(400).json({ error: "ERROR_EMPTY_CONNECTION_NAME" });
    }

    const existingConnection = await pool.query(
      "SELECT * FROM connections WHERE name = $1 AND id != $2",
      [newName, id]
    );
    if (existingConnection.rows.length > 0) {
      return res.status(400).json({ error: "ERROR_CONNECTION_ALREADY_EXISTS" });
    }

    const connection = await pool.query(
      'UPDATE "connections" SET name = $1 WHERE id = $2 RETURNING *',
      [newName, id]
    );
    res.json(connection.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Duplicate a connection
router.post("/:id/duplicate", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const originalConnection = await pool.query(
      "SELECT * FROM connections WHERE id = $1",
      [id]
    );

    if (originalConnection.rows.length === 0) {
      return res.status(404).json({ error: "connection not found" });
    }

    const { name, sheetId, status } = originalConnection.rows[0];
    const newName = `${name}_copy`;

    const existingConnection = await pool.query(
      "SELECT * FROM connections WHERE name = $1",
      [newName]
    );

    if (existingConnection.rows.length > 0) {
      return res.status(400).json({
        error: "ERROR_CONNECTION_ALREADY_EXISTS_WITH_NAME",
        name: newName,
      });
    }

    const duplicatedConnection = await pool.query(
      'INSERT INTO "connections" (name, sheet_id, status) VALUES ($1, $2, $3) RETURNING *',
      [newName, sheetId, status]
    );

    res.json(duplicatedConnection.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a connection
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM connections WHERE id = $1", [id]);
    res.json({ message: "TOAST_SUCCESS_DELETE_CONNECTION" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
