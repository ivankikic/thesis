import { useEffect, useState } from "react";
import { Sensor } from "../../utils/types";
import {
  PageContent,
  PageContentItem,
  PageContentSection,
  PageContentSubtitle,
  PageContentSwitch,
  PageContentTitle,
  PageHeader,
} from "./ConnectionStyles";
import { Container, PageTitle } from "../PagesStyles";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import axiosClient from "../../auth/apiClient";
import { useSidebar } from "../../contexts/SidebarContext";
import Switch from "react-switch";

const Connection = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [sensor, setSensor] = useState<Sensor | null>(null);
  const { sheets, reloadSheets } = useSidebar();

  const fetchSensor = async () => {
    const response = await axiosClient.get(`/api/sensors/${id}`);
    setSensor(response.data);
  };

  const handleSwitchChange = async () => {
    try {
      const response = await axiosClient.put(`/api/sensors/${id}/toggle`);
      setSensor(response.data);
    } catch (error) {
      console.error("Failed to update sensor status", error);
    }
  };

  useEffect(() => {
    fetchSensor();
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
        </PageContentSection>
      </PageContent>
    </Container>
  );
};

export default Connection;
