import axiosClient from "../../auth/apiClient";
import { Sheet } from "../../utils/types";

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

export const addNewDashboard = () => {
  console.log("Add new dashboard");
};

export const duplicateDashboard = (dashboardName: string) => {
  console.log(`Duplicate ${dashboardName}`);
};

export const deleteDashboard = (dashboardName: string) => {
  console.log(`Delete ${dashboardName}`);
};

export const renameDashboard = (dashboardName: string) => {
  console.log(`Rename ${dashboardName}`);
};

export const addNewConnection = () => {
  console.log("Add new connection");
};

export const duplicateConnection = (connectionName: string) => {
  console.log(`Duplicate ${connectionName}`);
};

export const deleteConnection = (connectionName: string) => {
  console.log(`Delete ${connectionName}`);
};

export const renameConnection = (connectionName: string) => {
  console.log(`Rename ${connectionName}`);
};
