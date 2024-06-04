import React, { createContext, useContext, useState, useCallback } from "react";
import axiosClient from "../auth/apiClient";
import { Sheet } from "../utils/types";

interface SidebarContextProps {
  sheets: Sheet[];
  setSheets: (sheets: Sheet[]) => void;
  reloadSheets: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sheets, setSheets] = useState<Sheet[]>([]);

  const reloadSheets = useCallback(() => {
    axiosClient.get("/api/sheets").then((res) => {
      setSheets(res.data);
    });
  }, []);

  return (
    <SidebarContext.Provider value={{ sheets, setSheets, reloadSheets }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
