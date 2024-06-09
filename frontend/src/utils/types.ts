export type Sheet = {
  id: number;
  name: string;
  rows: any[];
  columns: any[];
};

// export type Dashboard = {
//   id: number;
//   name: string;
//   data: JSON;
// };

export type DashboardData = {
  id: number;
  name: string;
  sheet_id: number;
  dashboard_data: {
    dashboard_type: "1:1" | "1:2" | "1:3";
    order: number;
    included_columns: string[];
    chart_type: "bar" | "line" | "pie";
  };
};

export type Dashboard = {
  id: number;
  name: string;
  data: DashboardData[];
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
  sheet_name: string;
  status: string;
  created_at: string;
};

export type FileType = {
  name: string;
  status: string;
};

export type Sensor = {
  id: number;
  name: string;
  file_name: string;
  rows_counter: number;
  sheet_id: number;
  location: string;
  status: string;
  created_at: string;
};

export type SensorSource = {
  id: number;
  name: string;
  file_name: string;
};

export type Alert = {
  id: number;
  name: string;
  up: number[];
  down: number[];
  sensor_id: number;
};

export type AlertLog = {
  id: number;
  sensor_id: number;
  column_name: string;
  limit_value: number;
  sensor_value: number;
  type: string;
  created_at: string;
};

export type SensorLog = {
  id: number;
  sensor_id: number;
  data: any;
  created_at: string;
};

export type Threshhold = {
  id: number;
  sensor_id: number;
  data: any[];
};
