import axiosClient from "../apiClient";
import { AuditLogType } from "../../assets/types";

const createAuditLog = async (auditLog: AuditLogType) => {
  try {
    const response = await axiosClient.post("/api/audit_logs", auditLog);
    return response.data;
  } catch (error) {
    console.error("Failed to create audit log:", error);
    throw error;
  }
};

export { createAuditLog };
