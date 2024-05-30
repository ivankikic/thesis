import { AxiosRequestConfig } from "axios";

export type AuditLogType = {
  UserId: string;
  LogType: string;
  Data: string;
};

export enum AuditLogTypes {
  CODE_CHANGE = "CODE_CHANGE",
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
