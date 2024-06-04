export type Sheet = {
  id: number;
  name: string;
  rows: JSON;
  columns: JSON;
};

export type Dashboard = {
  id: number;
  name: string;
  data: JSON;
};

export type Connection = {
  id: number;
  name: string;
  status: string;
  sheet_id: number;
};

export type ImportLog = {
  id: number;
  file_name: string;
  status: string;
  created_at: string;
};

export type FileType = {
  name: string;
  status: string;
};
