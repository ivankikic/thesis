import { createContext, useContext, ReactNode } from "react";
import useCustomToast from "../hooks/useCustomToast";

type ToastContextType = {
  showToast: (type: "success" | "error", message: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const showToast = useCustomToast();

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
