import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import usersRouter from "./routes/users-routes.js";
import authRouter from "./routes/auth-routes.js";
import sheetsRouter from "./routes/sheets-routes.js";
import dashboardsRouter from "./routes/dashboards-routes.js";
import connectionsRouter from "./routes/connections-routes.js";
import settingsRouter from "./routes/settings-routes.js";
import auditLogsRouter from "./routes/audit-logs-routes.js";
import importRouter from "./routes/import-routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = { credentials: true, origin: process.env.URL || "*" };

app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());

// routes
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/sheets", sheetsRouter);
app.use("/api/dashboards", dashboardsRouter);
app.use("/api/connections", connectionsRouter);
app.use("/api/settings", settingsRouter);
app.use("/api/audit-logs", auditLogsRouter);
app.use("/api/import", importRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
