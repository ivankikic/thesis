import { Container, PageTitle, CustomButton } from "../PagesStyles";
import { useTranslation } from "react-i18next";
import {
  LanguageButton,
  LanguageButtonContainer,
  PageContent,
  PageContentSection,
  PageContentTitle,
  PageHeader,
  TableContainer,
  DatePickerContainer,
  CustomDatePicker,
  StyledDatePickerInput,
} from "./SettingsStyles";
import LogoutIcon from "/icons/pages/logout.svg";
import LogoutModal from "../../components/Modal/LogoutModal";
import AuditLogModal from "../../components/Modal/AuditLogModal";
import { useEffect, useState } from "react";
import { LogoutUser } from "../../utils/userUtils";
import { useNavigate } from "react-router-dom";
import useCustomToast from "../../hooks/useCustomToast";
import axiosClient from "../../auth/apiClient";
import dayjs from "dayjs";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  DataCell,
} from "./SettingsStyles";
import { AuditLog } from "../../assets/types";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { hr } from "date-fns/locale";

registerLocale("hr", hr);

const Settings = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [auditLogs, setAuditLogs] = useState([]);
  const [selectedLogData, setSelectedLogData] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const customToast = useCustomToast();

  const confirmDeleteSheet = () => {
    handleLogout();
    setShowLogoutModal(false);
  };

  const handleLogout = () => {
    LogoutUser();
    navigate("/login");
    customToast("success", "TOAST_SUCCESS_LOGOUT", { autoClose: 1500 });
  };

  const languages = [
    { code: "hr", label: "Hrvatski" },
    { code: "en", label: "English" },
  ];

  const changeLanguage = async (language: string) => {
    await axiosClient.post("/api/settings/language", { language });
    i18n.changeLanguage(language);
  };

  const fetchAuditLogs = async (start?: Date, end?: Date) => {
    const params = {
      startDate: start ? dayjs(start).format("YYYY-MM-DD") : undefined,
      endDate: end ? dayjs(end).format("YYYY-MM-DD") : undefined,
    };
    const res = await axiosClient.get("/api/audit-logs/filter", { params });
    setAuditLogs(res.data);
  };

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const handleDataCellDoubleClick = (data: any) => {
    setSelectedLogData(JSON.stringify(data, null, 2));
  };

  const closeModal = () => {
    setSelectedLogData(null);
  };

  const handleShowLogs = () => {
    fetchAuditLogs(startDate || undefined, endDate || undefined);
  };

  return (
    <Container>
      <PageHeader>
        <PageTitle>{t("SETTINGS")}</PageTitle>
        <CustomButton variant="error" onClick={() => setShowLogoutModal(true)}>
          <img src={LogoutIcon} alt="Logout" />
          {t("LOGOUT")}
        </CustomButton>
      </PageHeader>
      <PageContent>
        <PageContentSection>
          <PageContentTitle>{t("LANGUAGE")}</PageContentTitle>
          <LanguageButtonContainer>
            {languages &&
              languages.map((language) => (
                <LanguageButton
                  className={i18n.language === language.code ? "active" : ""}
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                >
                  {language.label}
                </LanguageButton>
              ))}
          </LanguageButtonContainer>
        </PageContentSection>
        <PageContentSection>
          <PageContentTitle>{t("AUDIT_LOGS")}</PageContentTitle>
          <DatePickerContainer>
            <CustomDatePicker>
              <span>{t("FROM_DATE")}</span>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText={"18.09.2024."}
                dateFormat="dd.MM.yyyy"
                locale={i18n.language === "hr" ? "hr" : "en"}
                customInput={<StyledDatePickerInput />}
              />
            </CustomDatePicker>
            <CustomDatePicker>
              <span>{t("TO_DATE")}</span>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                placeholderText={"18.09.2024."}
                dateFormat="dd.MM.yyyy"
                locale={i18n.language === "hr" ? "hr" : "en"}
                customInput={<StyledDatePickerInput />}
              />
            </CustomDatePicker>
            <CustomButton onClick={handleShowLogs} variant="primary">
              {t("SHOW_LOGS")}
            </CustomButton>
          </DatePickerContainer>
          <TableContainer>
            <Table>
              <thead>
                <TableRow>
                  <TableHeader>Id</TableHeader>
                  <TableHeader>User</TableHeader>
                  <TableHeader>Date</TableHeader>
                  <TableHeader>Log Type</TableHeader>
                  <TableHeader>Data</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {auditLogs.length > 0 ? (
                  auditLogs.map((log: AuditLog) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.id}</TableCell>
                      <TableCell>{log.user_id}</TableCell>
                      <TableCell>
                        {dayjs(log.date).format("DD.MM.YYYY HH:mm:ss")}
                      </TableCell>
                      <TableCell>{log.log_type}</TableCell>
                      <DataCell
                        onDoubleClick={() =>
                          handleDataCellDoubleClick(log.data)
                        }
                      >
                        {JSON.stringify(log.data)}
                      </DataCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell>{t("NO_DATA_AVAILABLE")}</TableCell>
                  </TableRow>
                )}
              </tbody>
            </Table>
          </TableContainer>
        </PageContentSection>
      </PageContent>
      <LogoutModal
        show={showLogoutModal}
        handleClose={() => setShowLogoutModal(false)}
        handleConfirm={confirmDeleteSheet}
      />
      <AuditLogModal
        show={!!selectedLogData}
        handleClose={() => closeModal()}
        data={selectedLogData || ""}
      />
    </Container>
  );
};

export default Settings;
