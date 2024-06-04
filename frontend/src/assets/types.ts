import { AxiosRequestConfig } from "axios";

export type AuditLogType = {
  LogType: string;
  Data: string;
};

export enum AuditLogTypes {
  SHEET_CREATE = "SHEET_CREATE",
  SHEET_UPDATE = "SHEET_UPDATE",
  SHEET_RENAME = "SHEET_RENAME",
  SHEET_DUPLICATE = "SHEET_DUPLICATE",
  SHEET_DELETE = "SHEET_DELETE",
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface GetArguments {
  url: string;
  options?: AxiosRequestConfig;
}

export interface PostArguments {
  url: string;
  data: any;
  options?: AxiosRequestConfig;
}

export interface DeleteArguments {
  url: string;
  options?: AxiosRequestConfig;
}

export interface AuthContextType {
  isLoggedIn: boolean;
  user: any;
  loading: boolean;
  setUser: (user: any) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface Props {
  branch: string;
  documents: any[];
  total: number;
  startDate: Date | null;
  endDate: Date | null;
  today: Date | null;
}

export interface AuditLog {
  id: number;
  user_id: number;
  user_email: string;
  date: Date;
  log_type: string;
  data: any;
}
