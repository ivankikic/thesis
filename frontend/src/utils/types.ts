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
