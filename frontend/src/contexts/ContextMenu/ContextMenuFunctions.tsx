import { AuditLogTypes } from "../../assets/types";
import axiosClient from "../../auth/apiClient";
import { createAuditLog } from "../../services/auditLogService";
import { Connection, Dashboard, Sheet } from "../../utils/types";

export const addNewSheet = (
  setSheets: (sheets: Sheet[]) => void,
  setLoadingSheets: (loading: boolean) => void,
  showToast: (type: "success" | "error", message: string) => void
) => {
  setLoadingSheets(true);
  axiosClient
    .post("/api/sheets")
    .then(async (response) => {
      const newSheet = response.data;
      try {
        const res = await axiosClient.get("/api/sheets");
        setSheets(res.data);
        setLoadingSheets(false);
        showToast("success", "TOAST_SUCCESS_NEW_SHEET");
        await createAuditLog({
          LogType: AuditLogTypes.SHEET_CREATE,
          Data: JSON.stringify(newSheet),
        });
      } catch (error: any) {
        showToast(
          "error",
          error.response.data.error ?? "ERROR_SOMETHING_WENT_WRONG"
        );
      }
    })
    .catch((error: any) => {
      setLoadingSheets(false);
      showToast(
        "error",
        error.response.data.error ?? "ERROR_SOMETHING_WENT_WRONG"
      );
    });
};

export const duplicateSheet = (
  sheetId: number,
  setSheets: (sheets: Sheet[]) => void,
  setLoadingSheets: (loading: boolean) => void,
  showToast: (
    type: "success" | "error",
    message: string,
    data?: Record<string, any>
  ) => void
) => {
  setLoadingSheets(true);
  axiosClient
    .post(`/api/sheets/${sheetId}/duplicate`)
    .then(async (response) => {
      const newSheet = response.data;
      try {
        const res = await axiosClient.get("/api/sheets");
        setSheets(res.data);
        setLoadingSheets(false);
        showToast("success", "TOAST_SUCCESS_DUPLICATE_SHEET", {
          name: newSheet.name,
        });
        await createAuditLog({
          LogType: AuditLogTypes.SHEET_DUPLICATE,
          Data: JSON.stringify(newSheet),
        });
      } catch (error: any) {
        console.error(error);
      }
    })
    .catch((error: any) => {
      setLoadingSheets(false);
      showToast("error", error.response.data.error, {
        name: error.response.data.name,
      });
    });
};

export const deleteSheet = async (
  sheetId: number,
  setSheets: (sheets: Sheet[]) => void,
  setLoadingSheets: (loading: boolean) => void,
  showToast: (
    type: "success" | "error",
    message: string,
    data?: Record<string, any>
  ) => void
) => {
  setLoadingSheets(true);
  try {
    const res = await axiosClient.get("/api/sheets");
    await axiosClient.delete(`/api/sheets/${sheetId}`);
    setSheets(res.data.filter((sheet: Sheet) => sheet.id !== sheetId));
    setLoadingSheets(false);
    showToast("success", "TOAST_SUCCESS_DELETE_SHEET", {
      name: res.data.find((sheet: Sheet) => sheet.id === sheetId)?.name,
    });
    await createAuditLog({
      LogType: AuditLogTypes.SHEET_DELETE,
      Data: JSON.stringify({ id: sheetId }),
    });
  } catch (error: any) {
    setLoadingSheets(false);
    showToast(
      "error",
      error.response.data.error ?? "ERROR_SOMETHING_WENT_WRONG"
    );
  }
};

export const renameSheet = (
  sheetId: number,
  newName: string,
  showToast: (type: "success" | "error", message: string) => void
) => {
  return axiosClient
    .put(`/api/sheets/${sheetId}/rename`, { newName })
    .then(async () => {
      showToast("success", "TOAST_SUCCESS_RENAME_SHEET");
      const res = await axiosClient.get(`/api/sheets/${sheetId}`);
      console.log(res);
      await createAuditLog({
        LogType: AuditLogTypes.SHEET_RENAME,
        Data: JSON.stringify({ id: sheetId, name: newName }),
      });
    })
    .catch((error: any) => {
      showToast(
        "error",
        error.response.data.error ?? "ERROR_SOMETHING_WENT_WRONG"
      );
      throw error;
    });
};

export const addNewDashboard = (
  setDashboards: (dashboards: Dashboard[]) => void,
  setLoadingDashboards: (loading: boolean) => void,
  showToast: (type: "success" | "error", message: string) => void
) => {
  axiosClient
    .post("/api/dashboards")
    .then(() => {
      setLoadingDashboards(true);
      axiosClient
        .get("/api/dashboards")
        .then((res) => {
          setDashboards(res.data);
          setLoadingDashboards(false);
          showToast("success", "TOAST_SUCCESS_NEW_DASHBOARD");
        })
        .catch((error: any) => {
          setLoadingDashboards(false);
          showToast("error", error);
        });
    })
    .catch((error: any) => {
      showToast("error", error.response.data.error);
    });
};

export const duplicateDashboard = (
  dashboardId: number,
  setDashboards: (dashboards: Dashboard[]) => void,
  setLoadingDashboards: (loading: boolean) => void,
  showToast: (
    type: "success" | "error",
    message: string,
    data?: Record<string, any>
  ) => void
) => {
  setLoadingDashboards(true);
  axiosClient
    .post(`/api/dashboards/${dashboardId}/duplicate`)
    .then(() => {
      axiosClient
        .get("/api/dashboards")
        .then((res) => {
          setDashboards(res.data);
          setLoadingDashboards(false);
          showToast("success", "TOAST_SUCCESS_DUPLICATE_DASHBOARD", {
            name: res.data[res.data.length - 1].name,
          });
        })
        .catch((error: any) => {
          setLoadingDashboards(false);
          showToast("error", error.response.data.error, {
            name: error.response.data.name,
          });
        });
    })
    .catch((error: any) => {
      setLoadingDashboards(false);
      showToast("error", error.response.data.error, {
        name: error.response.data.name,
      });
    });
};

export const deleteDashboard = (
  dashboardId: number,
  setDashboards: (dashboards: Dashboard[]) => void,
  setLoadingDashboards: (loading: boolean) => void,
  showToast: (
    type: "success" | "error",
    message: string,
    data?: Record<string, any>
  ) => void
) => {
  setLoadingDashboards(true);
  axiosClient
    .delete(`/api/dashboards/${dashboardId}`)
    .then(() => {
      axiosClient
        .get("/api/dashboards")
        .then((res) => {
          setDashboards(res.data);
          setLoadingDashboards(false);
          showToast("success", "TOAST_SUCCESS_DELETE_DASHBOARD", {
            name: res.data[res.data.length - 1].name,
          });
        })
        .catch((error) => {
          setLoadingDashboards(false);
          showToast("error", error.response.data.error);
        });
    })
    .catch((error) => {
      setLoadingDashboards(false);
      showToast("error", error.response.data.error);
    });
};

export const renameDashboard = (
  dashboardId: number,
  newName: string,
  showToast: (type: "success" | "error", message: string) => void
) => {
  return axiosClient
    .put(`/api/dashboards/${dashboardId}/rename`, { newName })
    .then(() => {
      showToast("success", "TOAST_SUCCESS_RENAME_DASHBOARD");
    })
    .catch((error) => {
      showToast("error", error.response.data.error);
      throw error;
    });
};

export const addNewConnection = (
  setConnections: (connections: Connection[]) => void,
  setLoadingConnections: (loading: boolean) => void,
  showToast: (type: "success" | "error", message: string) => void
) => {
  setLoadingConnections(true);
  axiosClient
    .post("/api/connections")
    .then((res) => {
      setConnections(res.data);
      setLoadingConnections(false);
      showToast("success", "TOAST_SUCCESS_ADD_CONNECTION");
    })
    .catch((error) => {
      setLoadingConnections(false);
      showToast("error", error.response.data.error);
    });
};

export const duplicateConnection = (
  connectionId: number,
  setConnections: (connections: Connection[]) => void,
  setLoadingConnections: (loading: boolean) => void,
  showToast: (type: "success" | "error", message: string) => void
) => {
  setLoadingConnections(true);
  axiosClient
    .post(`/api/connections/${connectionId}/duplicate`)
    .then((res) => {
      setConnections(res.data);
      setLoadingConnections(false);
      showToast("success", "TOAST_SUCCESS_DUPLICATE_CONNECTION");
    })
    .catch((error) => {
      setLoadingConnections(false);
      showToast("error", error.response.data.error);
    });
};

export const deleteConnection = (
  connectionId: number,
  setConnections: (connections: Connection[]) => void,
  setLoadingConnections: (loading: boolean) => void,
  showToast: (type: "success" | "error", message: string) => void
) => {
  setLoadingConnections(true);
  axiosClient
    .delete(`/api/connections/${connectionId}`)
    .then(() => {
      axiosClient
        .get("/api/connections")
        .then((res) => {
          setConnections(res.data);
          setLoadingConnections(false);
          showToast("success", "TOAST_SUCCESS_DELETE_CONNECTION");
        })
        .catch((error) => {
          setLoadingConnections(false);
          showToast("error", error.response.data.error);
        });
    })
    .catch((error) => {
      setLoadingConnections(false);
      showToast("error", error.response.data.error);
    });
};

export const renameConnection = (
  connectionId: number,
  newName: string,
  showToast: (type: "success" | "error", message: string) => void
) => {
  return axiosClient
    .put(`/api/connections/${connectionId}/rename`, { newName })
    .then(() => {
      showToast("success", "TOAST_SUCCESS_RENAME_CONNECTION");
    })
    .catch((error) => {
      showToast("error", error.response.data.error);
      throw error;
    });
};

export const deleteDashboardItem = async (
  dashboardId: number,
  itemId: number,
  setDashboard: (dashboard: Dashboard) => void,
  showToast: (type: "success" | "error", message: string) => void
) => {
  try {
    const response = await axiosClient.get(`/api/dashboards/${dashboardId}`);
    const updatedData = response.data.data.filter(
      (item: any) => item.id !== itemId
    );
    const updatedDashboard = { ...response.data, data: updatedData };
    setDashboard(updatedDashboard);

    await axiosClient.put(`/api/dashboards/${dashboardId}/order`, {
      data: JSON.stringify(updatedDashboard.data),
    });

    showToast("success", "Item deleted successfully");
  } catch (error) {
    showToast("error", "Error deleting item");
    console.error("Error deleting dashboard item:", error);
  }
};

export const renameDashboardItem = async (
  dashboardId: number,
  itemId: number,
  newName: string,
  setDashboard: (dashboard: Dashboard) => void,
  showToast: (type: "success" | "error", message: string) => void
) => {
  try {
    const response = await axiosClient.get(`/api/dashboards/${dashboardId}`);
    const updatedData = response.data.data.map((item: any) =>
      item.id === itemId ? { ...item, name: newName } : item
    );
    const updatedDashboard = { ...response.data, data: updatedData };
    setDashboard(updatedDashboard);

    await axiosClient.put(`/api/dashboards/${dashboardId}/order`, {
      data: JSON.stringify(updatedDashboard.data),
    });

    showToast("success", "TOAST_SUCCESS_RENAME_ITEM");
  } catch (error) {
    showToast("error", "Error renaming item");
    console.error("Error renaming dashboard item:", error);
  }
};

export const editColumns = async (
  dashboardId: number,
  itemId: number,
  includedColumns: string[],
  setDashboard: (dashboard: Dashboard) => void,
  showToast: (type: "success" | "error", message: string) => void
) => {
  try {
    const response = await axiosClient.put(
      `/api/dashboards/${dashboardId}/columns`,
      {
        itemId,
        includedColumns,
      }
    );
    setDashboard(response.data);
    showToast("success", "TOAST_SUCCESS_EDIT_COLUMNS");
  } catch (error) {
    showToast("error", "Error updating columns");
    console.error("Error updating columns:", error);
  }
};

export const updateDashboardType = async (
  dashboardId: number,
  itemId: number,
  dashboardType: string,
  setDashboard: (dashboard: Dashboard) => void,
  showToast: (type: "success" | "error", message: string) => void
) => {
  try {
    const response = await axiosClient.put(
      `/api/dashboards/${dashboardId}/type`,
      {
        itemId,
        dashboardType,
      }
    );
    setDashboard(response.data);
  } catch (error) {
    showToast("error", "Error updating dashboard type");
    console.error("Error updating dashboard type:", error);
  }
};
