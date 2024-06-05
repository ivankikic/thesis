import { useEffect, useState } from "react";
import axiosClient from "../../auth/apiClient";
import { Container, CustomButton, PageTitle } from "../PagesStyles";
import {
  PageContent,
  PageContentSection,
  PageContentTitle,
  PageHeader,
  Table,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "./ConnectStyles";
import { useTranslation } from "react-i18next";
import { Sensor, SensorSource } from "../../utils/types";
import AddSensorModal from "../../components/Modal/AddSensorModal";
import toast from "react-hot-toast";
import { useSidebar } from "../../contexts/SidebarContext";

const Connect = () => {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [sensorSources, setSensorSources] = useState<SensorSource[]>([]);

  const { sheets, reloadSheets } = useSidebar();

  const fetchSensors = async () => {
    try {
      const response = await axiosClient.get("/api/sensors");
      setSensors(response.data);
    } catch (error) {
      console.error("Error fetching sensors:", error);
    }
  };

  const fetchSensorSources = async () => {
    try {
      const response = await axiosClient.get("/api/sensor-sources");
      setSensorSources(response.data);
    } catch (error) {
      console.error("Error fetching sensor sources:", error);
    }
  };

  const handleSubmit = async (
    name: string,
    file_name: string,
    location: string,
    sheet_name: string,
    columns: string[]
  ) => {
    setOpenModal(false);
    try {
      const newSheet = await axiosClient.post("/api/sheets", {
        name: sheet_name,
        rows: JSON.stringify([]),
        columns: JSON.stringify(columns),
      });
      const sheet_id = newSheet.data.id;
      const newSensor = await axiosClient.post("/api/sensors", {
        name,
        file_name,
        location,
        sheet_id,
      });
      await axiosClient.post("/api/alert-limits", {
        sensor_id: newSensor.data.id,
        data: JSON.stringify([]),
      });
      toast.success(t("TOAST_SUCCESS_ADD_SENSOR"), { duration: 1500 });
    } catch (error) {
      console.error("Error adding sensor:", error);
      toast.error(t("ERROR_ADD_SENSOR"), { duration: 1500 });
    } finally {
      fetchSensors();
      reloadSheets();
    }
  };

  useEffect(() => {
    fetchSensors();
    fetchSensorSources();
    reloadSheets();
  }, []);

  const { t } = useTranslation();
  return (
    <Container>
      <PageHeader>
        <PageTitle>{t("CONNECT")}</PageTitle>
        <CustomButton onClick={() => setOpenModal(true)} variant="primary">
          {t("ADD_SENSOR")}
        </CustomButton>
      </PageHeader>
      <PageContent>
        <PageContentSection>
          <PageContentTitle>{t("SENSORS")}</PageContentTitle>
          <TableContainer>
            <Table>
              <thead>
                <TableRow>
                  <TableHeader>{t("ID")}</TableHeader>
                  <TableHeader>{t("NAME")}</TableHeader>
                  <TableHeader>{t("STATUS")}</TableHeader>
                  <TableHeader>{t("LOCATION")}</TableHeader>
                  <TableHeader>{t("SHEET")}</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {sensors.length > 0 ? (
                  sensors.map((sensor: Sensor) => (
                    <TableRow key={sensor.id}>
                      <TableCell>{sensor.id}</TableCell>
                      <TableCell>{sensor.name}</TableCell>
                      <TableCell
                        className={
                          sensor.status === "active" ? "active" : "inactive"
                        }
                        style={{ textTransform: "uppercase" }}
                      >
                        {sensor.status === "active"
                          ? t("ACTIVE")
                          : t("INACTIVE")}
                      </TableCell>
                      <TableCell>{sensor.location}</TableCell>
                      <TableCell>
                        {
                          sheets.find((sheet) => sheet.id === sensor.sheet_id)
                            ?.name
                        }
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4}>{t("NO_DATA_AVAILABLE")}</TableCell>
                  </TableRow>
                )}
              </tbody>
            </Table>
          </TableContainer>
        </PageContentSection>
      </PageContent>
      {openModal && (
        <AddSensorModal
          show={openModal}
          handleClose={() => {
            setOpenModal(false);
            reloadSheets();
          }}
          handleSubmit={handleSubmit}
          sensorSources={sensorSources}
        />
      )}
    </Container>
  );
};

export default Connect;
