import { Container, PageTitle, CustomButton } from "../PagesStyles";
import { useTranslation } from "react-i18next";
import {
  PageContent,
  PageContentSection,
  PageContentTitle,
  PageHeader,
  TableContainer,
  DatePickerContainer,
  CustomDatePicker,
  StyledDatePickerInput,
  Table,
  TableHeader,
  TableRow,
  TableCell,
} from "./AlertStyles";
import { useEffect, useState } from "react";
import axiosClient from "../../auth/apiClient";
import dayjs from "dayjs";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { hr } from "date-fns/locale";
import { AlertLog, Sensor } from "../../utils/types";
import { useParams } from "react-router-dom";

registerLocale("hr", hr);

const Alert = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [alertLogs, setAlertLogs] = useState<AlertLog[]>([]);
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const fetchAlertLogs = async (
    start?: Date,
    end?: Date,
    sensorId?: string
  ) => {
    const params = {
      startDate: start ? dayjs(start).format("YYYY-MM-DD") : undefined,
      endDate: end ? dayjs(end).format("YYYY-MM-DD") : undefined,
      sensorId: sensorId,
    };
    const res = await axiosClient.get("/api/alert-logs/filter", { params });
    setAlertLogs(res.data);
  };

  const fetchSensors = async () => {
    const res = await axiosClient.get("/api/sensors");
    setSensors(res.data);
  };

  useEffect(() => {
    fetchAlertLogs();
    fetchSensors();
  }, []);

  const handleShowLogs = () => {
    fetchAlertLogs(startDate || undefined, endDate || undefined, id);
  };

  return (
    <Container>
      <PageHeader>
        <PageTitle>{t("ALERTS")}</PageTitle>
      </PageHeader>
      <PageContent>
        <PageContentSection>
          <PageContentTitle>
            {t("SENSOR") +
              " - " +
              sensors.find((sensor: Sensor) => sensor.id === Number(id))?.name}
          </PageContentTitle>
        </PageContentSection>
        <PageContentSection>
          <PageContentTitle>{t("ALERT_LOGS")}</PageContentTitle>
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
                  <TableHeader>{t("ID")}</TableHeader>
                  <TableHeader>{t("COLUMN_NAME")}</TableHeader>
                  <TableHeader>{t("LIMIT_VALUE")}</TableHeader>
                  <TableHeader>{t("SENSOR_VALUE")}</TableHeader>
                  <TableHeader>{t("TYPE")}</TableHeader>
                  <TableHeader>{t("CREATED_AT")}</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {alertLogs.length > 0 ? (
                  alertLogs.map((log: AlertLog) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.id}</TableCell>
                      <TableCell>{log.column_name}</TableCell>
                      <TableCell>{log.limit_value}</TableCell>
                      <TableCell>{log.sensor_value}</TableCell>
                      <TableCell>{log.type}</TableCell>
                      <TableCell>
                        {dayjs(log.created_at).format("DD.MM.YYYY HH:mm:ss")}
                      </TableCell>
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
    </Container>
  );
};

export default Alert;
