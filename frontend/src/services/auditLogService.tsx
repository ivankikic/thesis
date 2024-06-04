import axiosClient from "../auth/apiClient";
import { AuditLogType } from "../assets/types";
import { getCurrentUser } from "../utils/userUtils";

const createAuditLog = async (auditLog: AuditLogType) => {
  const user = await getCurrentUser();

  const data = {
    user_id: user.id,
    log_type: auditLog.LogType,
    data: auditLog.Data,
  };
  try {
    const response = await axiosClient.post("/api/audit-logs", data);
    return response.data;
  } catch (error) {
    console.error("Failed to create audit log:", error);
    throw error;
  }
};

export { createAuditLog };
