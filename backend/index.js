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
import sensorsRouter from "./routes/sensors-routes.js";
import sensorSourcesRouter from "./routes/sensor-sources-routes.js";
import sensorLogsRouter from "./routes/sensor-logs-routes.js";
import alertLimitsRouter from "./routes/alert-limits-routes.js";
import alertLogsRouter from "./routes/alert-logs-routes.js";
import reportsRouter from "./routes/reports-routes.js";
import emailNotificationsRouter from "./routes/email-notifications.js";

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
app.use("/api/sensors", sensorsRouter);
app.use("/api/sensor-sources", sensorSourcesRouter);
app.use("/api/sensor-logs", sensorLogsRouter);
app.use("/api/alert-limits", alertLimitsRouter);
app.use("/api/alert-logs", alertLogsRouter);
app.use("/api/reports", reportsRouter);
app.use("/api/email-notifications", emailNotificationsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
