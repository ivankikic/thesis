import axiosClient from "../../auth/apiClient";
import { Connection, Dashboard, Sheet } from "../../utils/types";

export const addNewSheet = (
  setSheets: (sheets: Sheet[]) => void,
  setLoadingSheets: (loading: boolean) => void,
  showToast: (type: "success" | "error", message: string) => void
) => {
  axiosClient
    .post("/api/sheets")
    .then(() => {
      setLoadingSheets(true);
      axiosClient
        .get("/api/sheets")
        .then((res) => {
          setSheets(res.data);
          setLoadingSheets(false);
          showToast("success", "TOAST_SUCCESS_NEW_SHEET");
        })
        .catch((error) => {
          setLoadingSheets(false);
          showToast("error", error);
        });
    })
    .catch((error) => {
      showToast("error", error.response.data.error);
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
    .then(() => {
      axiosClient
        .get("/api/sheets")
        .then((res) => {
          setSheets(res.data);
          setLoadingSheets(false);
          showToast("success", "TOAST_SUCCESS_DUPLICATE_SHEET", {
            name: res.data[res.data.length - 1].name,
          });
        })
        .catch((error) => {
          setLoadingSheets(false);
          showToast("error", error.response.data.error, {
            name: error.response.data.name,
          });
        });
    })
    .catch((error) => {
      setLoadingSheets(false);
      showToast("error", error.response.data.error, {
        name: error.response.data.name,
      });
    });
};

export const deleteSheet = (
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
    .delete(`/api/sheets/${sheetId}`)
    .then(() => {
      axiosClient
        .get("/api/sheets")
        .then((res) => {
          setSheets(res.data);
          setLoadingSheets(false);
          showToast("success", "TOAST_SUCCESS_DELETE_SHEET", {
            name: res.data[res.data.length - 1].name,
          });
        })
        .catch((error) => {
          setLoadingSheets(false);
          showToast("error", error.response.data.error);
        });
    })
    .catch((error) => {
      setLoadingSheets(false);
      showToast("error", error.response.data.error);
    });
};

export const renameSheet = (
  sheetId: number,
  newName: string,
  showToast: (type: "success" | "error", message: string) => void
) => {
  return axiosClient
    .put(`/api/sheets/${sheetId}/rename`, { newName })
    .then(() => {
      showToast("success", "TOAST_SUCCESS_RENAME_SHEET");
    })
    .catch((error) => {
      showToast("error", error.response.data.error);
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
        .catch((error) => {
          setLoadingDashboards(false);
          showToast("error", error);
        });
    })
    .catch((error) => {
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
        .catch((error) => {
          setLoadingDashboards(false);
          showToast("error", error.response.data.error, {
            name: error.response.data.name,
          });
        });
    })
    .catch((error) => {
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
