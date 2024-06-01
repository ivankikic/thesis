import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const useCustomToast = () => {
  const { t } = useTranslation();

  const showToast = (
    type: "success" | "error",
    message: string,
    data?: Record<string, any>
  ) => {
    const translatedMessage = t(message, data);
    if (type === "success") {
      toast.success(translatedMessage);
    } else if (type === "error") {
      toast.error(translatedMessage);
    }
  };

  return showToast;
};

export default useCustomToast;
