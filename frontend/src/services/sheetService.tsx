import axiosClient from "../auth/apiClient";

export const isSheetNameAlreadyTaken = async (name: string) => {
  const response = await axiosClient.post("/api/sheets/check-name", {
    name,
  });
  return response.data;
};

export const getSheet = async (id: string) => {
  const response = await axiosClient.get(`/api/sheets/${id}`);
  return response.data;
};

export const saveSheetRows = async (sheetId: number, rows: any) => {
  const response = await axiosClient.put(`/api/sheets/${sheetId}/rows`, {
    rows,
  });
  return response.data;
};
