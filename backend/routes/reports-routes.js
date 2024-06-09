import express from "express";
import pool from "../db.js";
import { authenticateToken } from "../middleware/authorization.js";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM reports");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  const { name, interval_type, file_name, rows, columns } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO reports (name, interval_type, file_name) VALUES ($1, $2, $3) RETURNING *",
      [name, interval_type, file_name]
    );

    const columnData = columns.reduce((acc, column, index) => {
      acc[column] = rows.map((row) => row[index].value);
      return acc;
    }, {});

    const summaries = await Promise.all(
      columns.map(async (column) => {
        const response = await openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content: `Summarize the following data for ${column} considering the interval type ${interval_type} and keep in mind that every row represents the data for one minute: ${JSON.stringify(
                columnData[column]
              )}`,
            },
          ],
          model: "gpt-4o",
        });
        return response.choices[0].message.content;
      })
    );

    const contentMessage = `Summarize the following summaries and dont write someting like 'here is your summarize' just give me data, and few sentences about that how you see it, is it good, normal, abnormal, etc. This will be used in a file to give a client quick peak into the data. 
    
    Try in first few sentences say for which period is this data, interval type is ${interval_type} so if it is daily that it is for todays date, if it is weekly that it is for last week, etc. 
    Dont write nonsense in brackets after column names like (xy days..), can you not write "- Period: .." for every column: 
    
    First in few sentences said about the data, date, what are the columns. Then for every column write some statictics, like min, max, average, etc. and write some sentences about that how you see it, is it good, normal, abnormal, etc. 

    Later on write some overall summary, what is the problem, what is the solution, what is the recommendation, are the things good or not, etc.

    Here are the summaries of every column:

    ${JSON.stringify(summaries)}
    `;

    const finalSummaryResponse = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: contentMessage,
        },
      ],
      model: "gpt-4o",
    });

    const finalSummary = finalSummaryResponse.choices[0].message.content;

    console.log(finalSummary);

    const doc = new PDFDocument({
      size: "A4",
      margins: {
        top: 100,
        bottom: 50,
        left: 50,
        right: 50,
      },
    });
    const pdfPath = path.join(__dirname, `../reports/${file_name}.pdf`);
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    const logoPath = path.join(__dirname, "../assets/logo.png");
    doc.image(logoPath, 50, 20, { width: 150 });

    const getTitle = () => {
      switch (interval_type) {
        case "daily":
          return "Daily report";
        case "weekly":
          return "Weekly report";
        case "monthly":
          return "Monthly report";
        case "quartal":
          return "Quartal report";
        case "yearly":
          return "Yearly report";
        default:
          return "Report";
      }
    };

    doc.fontSize(20).text(name, { align: "center" });
    doc.fontSize(12).text(getTitle(), { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(finalSummary, { align: "left" });

    doc.end();

    writeStream.on("finish", () => {
      res.status(201).json(result.rows[0]);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

router.get("/download/:file_name", authenticateToken, async (req, res) => {
  const { file_name } = req.params;
  const filePath = path.join(__dirname, `../reports/${file_name}.pdf`);
  if (fs.existsSync(filePath)) {
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${file_name}.pdf`
    );
    res.download(filePath);
  } else {
    res.status(404).json({ error: "File not found" });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM reports WHERE id = $1 RETURNING *",
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

export default router;
