import {
  PageContent,
  PageHeader,
  SensorCard,
  AlertSection,
  AlertInput,
  AlertHeader,
  AlertInputContainer,
  AlertInputTitle,
  AlertInputContent,
  AlertInputContentSection,
  AlertInputLabel,
} from "./AlertingSystemStyles";
import { Container, CustomButton, PageTitle } from "../PagesStyles";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Sensor } from "../../utils/types";
import { useSidebar } from "../../contexts/SidebarContext";
import axiosClient from "../../auth/apiClient";
import RightArrowIcon from "/icons/arrow.svg";
import toast from "react-hot-toast";

const AlertingSystem = () => {
  const { t } = useTranslation();
  const { sheets, reloadSheets } = useSidebar();
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [expandedSensor, setExpandedSensor] = useState<number | null>(null);
  const [alertLimits, setAlertLimits] = useState<{
    [key: number]: { [column: string]: { upper: number; lower: number } };
  }>({});

  const fetchSensors = async () => {
    try {
      const response = await axiosClient.get("/api/sensors");
      setSensors(response.data);
    } catch (error) {
      console.error("Error fetching sensors:", error);
    }
  };

  const fetchAlertLimits = async () => {
    try {
      const response = await axiosClient.get("/api/alert-limits");
      const limits = response.data.reduce((acc: any, item: any) => {
        acc[item.sensor_id] = item.data.reduce((columns: any, col: any) => {
          columns[col.column_name] = { upper: col.upper, lower: col.lower };
          return columns;
        }, {});
        return acc;
      }, {});
      setAlertLimits(limits);
    } catch (error) {
      console.error("Error fetching alert limits:", error);
    }
  };

  useEffect(() => {
    reloadSheets();
    fetchSensors();
    fetchAlertLimits();
  }, []);

  const handleCardClick = (sensorId: number) => {
    setExpandedSensor(expandedSensor === sensorId ? null : sensorId);
  };

  const handleInputChange = (
    sensorId: number,
    column: string,
    type: "upper" | "lower",
    value: number
  ) => {
    setAlertLimits((prev) => ({
      ...prev,
      [sensorId]: {
        ...prev[sensorId],
        [column]: {
          ...prev[sensorId]?.[column],
          [type]: value,
        },
      },
    }));
  };

  const saveAlertLimits = async (sensorId: number) => {
    const sensorLimits = alertLimits[sensorId] || {};
    const columns =
      sheets.find(
        (sheet) =>
          sheet.id ===
          sensors.find((sensor) => sensor.id === sensorId)?.sheet_id
      )?.columns || [];

    const data = columns
      .filter(
        (column) =>
          column.toLowerCase() !== "timestamp" &&
          column.toLowerCase() !== "id" &&
          column.toLowerCase() !== "date"
      )
      .map((column) => ({
        column_name: column,
        upper: sensorLimits[column]?.upper ?? null,
        lower: sensorLimits[column]?.lower ?? null,
      }));

    const formattedData = {
      sensor_id: sensorId,
      data: JSON.stringify(data),
    };

    try {
      await axiosClient.put("/api/alert-limits", formattedData);
      toast.success(t("TOAST_SUCCESS_SAVE_ALERT_LIMITS"), { duration: 1500 });
    } catch (error) {
      console.error("Error saving alert limits:", error);
      toast.error(t("ERROR_SAVE_ALERT_LIMITS"), { duration: 1500 });
    }
  };

  return (
    <Container>
      <PageHeader>
        <PageTitle>{t("ALERT_SYSTEM")}</PageTitle>
      </PageHeader>
      <PageContent>
        {sensors.length > 0 ? (
          sensors.map((sensor) => (
            <SensorCard key={sensor.id}>
              <AlertHeader onClick={() => handleCardClick(sensor.id)}>
                <span>{sensor.name}</span>
                <span>
                  <img
                    src={RightArrowIcon}
                    className={expandedSensor === sensor.id ? "rotated" : ""}
                    style={{
                      width: "20px",
                      height: "20px",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </span>
              </AlertHeader>
              {expandedSensor === sensor.id && (
                <AlertSection>
                  {sheets
                    .find((sheet) => sheet.id === sensor.sheet_id)
                    ?.columns.map(
                      (column) =>
                        column.toLowerCase() !== "timestamp" &&
                        column.toLowerCase() !== "id" &&
                        column.toLowerCase() !== "date" && (
                          <AlertInputContainer key={column}>
                            <AlertInputTitle>{column}</AlertInputTitle>
                            <AlertInputContent>
                              <AlertInputContentSection>
                                <AlertInputLabel>
                                  {t("UPPER_LIMIT")}
                                </AlertInputLabel>
                                <AlertInput
                                  type="number"
                                  value={
                                    alertLimits[sensor.id]?.[column]?.upper ??
                                    ""
                                  }
                                  onChange={(e) =>
                                    handleInputChange(
                                      sensor.id,
                                      column,
                                      "upper",
                                      e.target.value === ""
                                        ? NaN
                                        : Number(e.target.value)
                                    )
                                  }
                                  onBlur={(e) => {
                                    if (e.target.value === "") {
                                      handleInputChange(
                                        sensor.id,
                                        column,
                                        "upper",
                                        NaN
                                      );
                                    }
                                  }}
                                />
                              </AlertInputContentSection>
                              <AlertInputContentSection>
                                <AlertInputLabel>
                                  {t("LOWER_LIMIT")}
                                </AlertInputLabel>
                                <AlertInput
                                  type="number"
                                  value={
                                    alertLimits[sensor.id]?.[column]?.lower ??
                                    ""
                                  }
                                  onChange={(e) =>
                                    handleInputChange(
                                      sensor.id,
                                      column,
                                      "lower",
                                      e.target.value === ""
                                        ? NaN
                                        : Number(e.target.value)
                                    )
                                  }
                                  onBlur={(e) => {
                                    if (e.target.value === "") {
                                      handleInputChange(
                                        sensor.id,
                                        column,
                                        "lower",
                                        NaN
                                      );
                                    }
                                  }}
                                />
                              </AlertInputContentSection>
                            </AlertInputContent>
                          </AlertInputContainer>
                        )
                    )}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      marginTop: "10px",
                    }}
                  >
                    <CustomButton
                      variant="primary"
                      onClick={() => saveAlertLimits(sensor.id)}
                    >
                      {t("SAVE_ALERT_LIMITS")}
                    </CustomButton>
                  </div>
                </AlertSection>
              )}
            </SensorCard>
          ))
        ) : (
          <div>{t("NO_SENSORS")}</div>
        )}
      </PageContent>
    </Container>
  );
};

export default AlertingSystem;
