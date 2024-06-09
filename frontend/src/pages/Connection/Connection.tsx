import { useEffect, useState } from "react";
import { Sensor, SensorLog } from "../../utils/types";
import {
  CustomDatePicker,
  DatePickerContainer,
  PageContent,
  PageContentItem,
  PageContentSection,
  PageContentSubtitle,
  PageContentSwitch,
  PageContentTitle,
  PageHeader,
  StyledDatePickerInput,
} from "./ConnectionStyles";
import { Container, PageTitle, CustomButton } from "../PagesStyles";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import axiosClient from "../../auth/apiClient";
import { useSidebar } from "../../contexts/SidebarContext";
import Switch from "react-switch";
import dayjs from "dayjs";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  DataCell,
} from "./ConnectionStyles";
import SensorLogModal from "../../components/Modal/SensorLogModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Connection = () => {
  const { id } = useParams();
  const [sensor, setSensor] = useState<Sensor | null>(null);
  const [sensorLogs, setSensorLogs] = useState([]);
  const { sheets, reloadSheets } = useSidebar();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [selectedLogData, setSelectedLogData] = useState<string | null>(null);
  const { t, i18n } = useTranslation();

  const fetchSensor = async () => {
    const response = await axiosClient.get(`/api/sensors/${id}`);
    setSensor(response.data);
  };

  const fetchSensorLogs = async () => {
    const params = {
      startDate: startDate ? dayjs(startDate).format("YYYY-MM-DD") : new Date(),
      endDate: endDate ? dayjs(endDate).format("YYYY-MM-DD") : new Date(),
      sensor_id: id,
    };
    const res = await axiosClient.get("/api/sensor-logs", { params });
    setSensorLogs(res.data);
  };

  const handleDataCellDoubleClick = (data: any) => {
    setSelectedLogData(JSON.stringify(data, null, 2));
  };

  const closeModal = () => {
    setSelectedLogData(null);
  };

  const handleSwitchChange = async () => {
    try {
      const response = await axiosClient.put(`/api/sensors/${id}/toggle`);
      setSensor(response.data);
    } catch (error) {
      console.error("Failed to update sensor status", error);
    }
  };

  const handleShowLogs = () => {
    fetchSensorLogs();
  };

  useEffect(() => {
    fetchSensor();
    fetchSensorLogs();
    reloadSheets();
  }, [id]);

  return (
    <Container>
      <PageHeader>
        <PageTitle>{t("MANAGE_SENSOR")}</PageTitle>
      </PageHeader>
      <PageContent>
        <PageContentSection>
          <PageContentTitle>{sensor?.name}</PageContentTitle>
          <PageContentSubtitle>
            <span className="status-label">{t("STATUS")}:</span>
            <span className="status-value">
              {sensor?.status === "active" ? (
                <span className="status-active">{t("ACTIVE")}</span>
              ) : (
                <span className="status-inactive">{t("INACTIVE")}</span>
              )}
            </span>
          </PageContentSubtitle>
          <PageContentItem>
            {t("LOCATION")}: {sensor?.location}
          </PageContentItem>
          <PageContentItem>
            {t("SHEET")}:{" "}
            {sheets.find((sheet) => sheet.id === sensor?.sheet_id)?.name}
          </PageContentItem>
          <PageContentSwitch>
            <Switch
              onChange={handleSwitchChange}
              checked={sensor?.status === "active"}
              onColor="#7AD830"
              offColor="#a9a9a9"
            />
          </PageContentSwitch>
        </PageContentSection>
        <PageContentSection>
          <PageContentTitle>{t("SENSOR_LOGS")}</PageContentTitle>
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
          <Table className="mb-3">
            <thead>
              <TableRow>
                <TableHeader>{t("DATE")}</TableHeader>
                <TableHeader>{t("DATA")}</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {sensorLogs.length > 0 ? (
                sensorLogs.map((log: SensorLog) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      {dayjs(log.created_at).format("DD.MM.YYYY HH:mm:ss")}
                    </TableCell>
                    <DataCell
                      onDoubleClick={() => handleDataCellDoubleClick(log.data)}
                    >
                      {JSON.stringify(log.data)}
                    </DataCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2}>{t("NO_DATA_AVAILABLE")}</TableCell>
                </TableRow>
              )}
            </tbody>
          </Table>
        </PageContentSection>
      </PageContent>
      <SensorLogModal
        show={!!selectedLogData}
        handleClose={() => closeModal()}
        data={selectedLogData || ""}
      />
    </Container>
  );
};

export default Connection;
