import { useState, useEffect, useRef } from "react";
import {
  SidebarContainer,
  Logo,
  ToggleButton,
  OpenButton,
  SidebarContent,
  SidebarItem,
  SidebarDivider,
  SidebarTitle,
  NestedItem,
  ArrowIcon,
  UserInfo,
  UserInitials,
  UserName,
  SettingsIcon,
  SidebarFooter,
  FixedSection,
  SidebarContentWrapper,
  SidebarContentHeader,
} from "./SidebarStyles";
import FarmsenseLogo from "/big_logo_w.svg";
import ImportIcon from "/icons/import.svg";
import ConnectIcon from "/icons/connect.svg";
import SettingsIconImg from "/icons/settings.svg";
import SheetIcon from "/icons/sheet.svg";
import SheetsIcon from "/icons/sheets.svg";
import DashboardIcon from "/icons/dashboard.svg";
import DashboardsIcon from "/icons/dashboards.svg";
import ConnectionIcon from "/icons/connection.svg";
import ConnectionsIcon from "/icons/connections.svg";
import RightArrowIcon from "/icons/arrow.svg";
import AlertIcon from "/icons/alert.svg";
import AlertsIcon from "/icons/alerts.svg";
import AlertYellowIcon from "/icons/alert_y.svg";
import ReportIcon from "/icons/report.svg";
import { useAuthContext } from "../../auth/AuthProvider";
import {
  addNewSheet,
  duplicateSheet,
  deleteSheet,
  renameSheet,
  addNewDashboard,
  duplicateDashboard,
  deleteDashboard,
  renameDashboard,
  deleteConnection,
} from "../../contexts/ContextMenu/ContextMenuFunctions";
import ContextMenu from "../../contexts/ContextMenu/ContextMenu";
import { getCurrentUser } from "../../utils/userUtils";
import { useTranslation } from "react-i18next";
import axiosClient from "../../auth/apiClient";
import { Alert, Connection, Dashboard } from "../../utils/types";
import useCustomToast from "../../hooks/useCustomToast";
import ConfirmDeleteSheetModal from "../Modal/DeleteSheetModal";
import ConfirmDeleteDashboardModal from "../Modal/DeleteDashboardModal";
import ConfirmDeleteConnectionModal from "../Modal/DeleteConnectionModal";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../../contexts/SidebarContext";

const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const navigate = useNavigate();

  const [sheetsOpen, setSheetsOpen] = useState(false);
  const [dashboardsOpen, setDashboardsOpen] = useState(false);
  const [connectionsOpen, setConnectionsOpen] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);

  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const { t } = useTranslation();
  const { user, setUser } = useAuthContext();
  const showToast = useCustomToast();

  const { sheets, setSheets, reloadSheets } = useSidebar();
  const [loadingSheets, setLoadingSheets] = useState(false);

  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loadingDashboards, setLoadingDashboards] = useState(false);

  const [connections, setConnections] = useState<Connection[]>([]);
  const [loadingConnections, setLoadingConnections] = useState(false);

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [_, setLoadingAlerts] = useState(false);

  useEffect(() => {
    if (sheetsOpen && sheets.length === 0) {
      setLoadingSheets(true);
      axiosClient.get("/api/sheets").then((res) => {
        setSheets(res.data);
      });
      setLoadingSheets(false);
    }
  }, [sheetsOpen]);

  useEffect(() => {
    if (dashboardsOpen && dashboards.length === 0) {
      setLoadingDashboards(true);
      axiosClient.get("/api/dashboards").then((res) => {
        setDashboards(res.data);
      });
      setLoadingDashboards(false);
    }
  }, [dashboardsOpen]);

  useEffect(() => {
    if (connectionsOpen && connections.length === 0) {
      setLoadingConnections(true);
      axiosClient.get("/api/sensors").then((res) => {
        setConnections(res.data);
      });
      setLoadingConnections(false);
    }
  }, [connectionsOpen]);

  useEffect(() => {
    if (alertsOpen && alerts.length === 0) {
      setLoadingAlerts(true);
      axiosClient.get("/api/alerts").then((res) => {
        setAlerts(res.data);
      });
      setLoadingAlerts(false);
    }
  }, [alertsOpen]);

  if (!user) {
    getCurrentUser()
      .then((fetchedUser) => {
        setUser(fetchedUser);
      })
      .catch((error) => {
        console.error("Failed to fetch current user:", error);
      });
  }

  const getAllData = async () => {
    await axiosClient.get("/api/sheets").then((res) => {
      setSheets(res.data);
    });
    await axiosClient.get("/api/dashboards").then((res) => {
      setDashboards(res.data);
    });
    await axiosClient.get("/api/sensors").then((res) => {
      setConnections(res.data);
    });
    await axiosClient.get("/api/alerts").then((res) => {
      setAlerts(res.data);
    });
  };

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    position: { x: 0, y: 0 },
    items: [],
  });

  const handleContextMenu = (event: React.MouseEvent, items: any) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      position: { x: event.pageX, y: event.pageY },
      items,
    });
  };

  const closeContextMenu = () => {
    setContextMenu({ ...contextMenu, visible: false });
  };

  const inputValueRef = useRef("");

  const [inputValue, setInputValue] = useState("");
  inputValueRef.current = inputValue;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteDashboardModal, setShowDeleteDashboardModal] =
    useState(false);
  const [showDeleteConnectionModal, setShowDeleteConnectionModal] =
    useState(false);
  const [sheetToDelete, setSheetToDelete] = useState<number | null>(null);
  const [dashboardToDelete, setDashboardToDelete] = useState<number | null>(
    null
  );
  const [connectionToDelete, setConnectionToDelete] = useState<number | null>(
    null
  );

  const handleDeleteSheet = (sheetId: number) => {
    setSheetToDelete(sheetId);
    setShowDeleteModal(true);
  };

  const handleDeleteDashboard = (dashboardId: number) => {
    setDashboardToDelete(dashboardId);
    setShowDeleteDashboardModal(true);
  };

  const confirmDeleteSheet = () => {
    if (sheetToDelete) {
      deleteSheet(sheetToDelete, setSheets, setLoadingSheets, showToast);
      setShowDeleteModal(false);
      setSheetToDelete(null);
    }
  };

  const confirmDeleteDashboard = () => {
    if (dashboardToDelete) {
      deleteDashboard(
        dashboardToDelete,
        setDashboards,
        setLoadingDashboards,
        showToast
      );
      setShowDeleteDashboardModal(false);
      setDashboardToDelete(null);
    }
  };

  const confirmDeleteConnection = () => {
    if (connectionToDelete) {
      deleteConnection(
        connectionToDelete,
        setConnections,
        setLoadingConnections,
        showToast
      );
      setShowDeleteConnectionModal(false);
      setConnectionToDelete(null);
    }
  };

  return (
    <>
      {!isOpen && (
        <OpenButton onClick={() => setIsOpen(true)}>{">>"}</OpenButton>
      )}
      <SidebarContainer
        isOpen={isOpen}
        onContextMenu={(e) => e.preventDefault()}
      >
        <SidebarContentWrapper isOpen={isOpen}>
          <SidebarContentHeader>
            <Logo onClick={() => navigate("/")}>
              <img src={FarmsenseLogo} alt="Farmsense Logo" />
            </Logo>
            <ToggleButton onClick={() => setIsOpen(false)}>{"<<"}</ToggleButton>
          </SidebarContentHeader>
          <FixedSection>
            <SidebarItem onClick={() => navigate("/import")}>
              <img src={ImportIcon} alt="Import icon" />
              <span>{t("IMPORT")}</span>
            </SidebarItem>
            <SidebarItem onClick={() => navigate("/connect")}>
              <img src={ConnectIcon} alt="Connect icon" />
              <span>{t("CONNECT")}</span>
            </SidebarItem>
            <SidebarItem onClick={() => navigate("/alerting-system")}>
              <img src={AlertIcon} alt="Settings icon" />
              <span>{t("ALERT_SYSTEM")}</span>
            </SidebarItem>
            <SidebarItem onClick={() => navigate("/reports")}>
              <img src={ReportIcon} alt="Report icon" />
              <span>{t("REPORTS")}</span>
            </SidebarItem>
            <SidebarDivider />
          </FixedSection>
          <SidebarContent isOpen={isOpen}>
            <SidebarTitle
              onClick={() => {
                getAllData();
                setSheetsOpen(!sheetsOpen);
              }}
              onMouseEnter={() => setHoveredSection("sheets")}
              onMouseLeave={() => setHoveredSection(null)}
              onContextMenu={(e) =>
                handleContextMenu(e, [
                  {
                    label: t("NEW_SHEET"),
                    onClick: () => {
                      addNewSheet(setSheets, setLoadingSheets, showToast);
                      closeContextMenu();
                    },
                    type: "item",
                    actionType: "add_sheet",
                  },
                ])
              }
            >
              <ArrowIcon
                isOpen={sheetsOpen}
                isArrow={hoveredSection === "sheets"}
                src={hoveredSection === "sheets" ? RightArrowIcon : SheetsIcon}
                alt="Icon"
              />
              <span>{t("SHEETS")}</span>
            </SidebarTitle>
            {sheetsOpen &&
              (loadingSheets ? (
                <NestedItem>
                  <span>...</span>
                </NestedItem>
              ) : (
                sheets.map((sheet) => (
                  <NestedItem
                    key={sheet.id}
                    onClick={() => navigate(`/sheet/${sheet.id}`)}
                    onContextMenu={(e) =>
                      handleContextMenu(e, [
                        {
                          label: "Rename sheet",
                          onClick: () => {
                            const currentValue = inputValueRef.current.trim();
                            if (currentValue === "") {
                              showToast("error", "ERROR_EMPTY_SHEET_NAME");
                              return;
                            }
                            renameSheet(sheet.id, currentValue, showToast).then(
                              () => reloadSheets()
                            );
                          },
                          type: "input",
                          actionType: "rename",
                          data: sheet.name,
                          onChange: (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setInputValue(e.target.value);
                          },
                        },
                        { type: "divider" },
                        {
                          label: "Duplicate sheet",
                          onClick: () => {
                            duplicateSheet(
                              sheet.id,
                              setSheets,
                              setLoadingSheets,
                              showToast
                            );
                            closeContextMenu();
                          },
                          type: "item",
                          actionType: "duplicate",
                        },
                        {
                          label: "Delete sheet",
                          onClick: () => handleDeleteSheet(sheet.id),
                          type: "item",
                          actionType: "delete",
                        },
                      ])
                    }
                  >
                    <img src={SheetIcon} alt="Sheet icon" />
                    <span>{sheet.name}</span>
                  </NestedItem>
                ))
              ))}
            <SidebarTitle
              onClick={() => {
                getAllData();
                setDashboardsOpen(!dashboardsOpen);
              }}
              onMouseEnter={() => setHoveredSection("dashboards")}
              onMouseLeave={() => setHoveredSection(null)}
              onContextMenu={(e) =>
                handleContextMenu(e, [
                  {
                    label: t("NEW_DASHBOARD"),
                    onClick: () => {
                      addNewDashboard(
                        setDashboards,
                        setLoadingDashboards,
                        showToast
                      );
                      closeContextMenu();
                    },
                    type: "item",
                    actionType: "add_dashboard",
                  },
                ])
              }
            >
              <ArrowIcon
                isOpen={dashboardsOpen}
                isArrow={hoveredSection === "dashboards"}
                src={
                  hoveredSection === "dashboards"
                    ? RightArrowIcon
                    : DashboardsIcon
                }
                alt="Icon"
              />
              <span>{t("DASHBOARDS")}</span>
            </SidebarTitle>
            {dashboardsOpen &&
              (loadingDashboards ? (
                <NestedItem>
                  <span>...</span>
                </NestedItem>
              ) : (
                dashboards.map((dashboard) => (
                  <NestedItem
                    key={dashboard.id}
                    onClick={() => navigate(`/dashboard/${dashboard.id}`)}
                    onContextMenu={(e) =>
                      handleContextMenu(e, [
                        {
                          label: "Rename dashboard",
                          onClick: () => {
                            const currentValue = inputValueRef.current.trim();
                            if (currentValue === "") {
                              showToast("error", "ERROR_EMPTY_DASHBOARD_NAME");
                              return;
                            }
                            renameDashboard(
                              dashboard.id,
                              currentValue,
                              showToast
                            ).then(() => {
                              setDashboards((prevDashboards) =>
                                prevDashboards.map((d) =>
                                  d.id === dashboard.id
                                    ? { ...d, name: currentValue }
                                    : d
                                )
                              );
                            });
                          },
                          type: "input",
                          actionType: "rename",
                          data: dashboard.name,
                          onChange: (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setInputValue(e.target.value);
                          },
                        },
                        { type: "divider" },
                        {
                          label: "Duplicate dashboard",
                          onClick: () => {
                            duplicateDashboard(
                              dashboard.id,
                              setDashboards,
                              setLoadingDashboards,
                              showToast
                            );
                            closeContextMenu();
                          },
                          type: "item",
                          actionType: "duplicate",
                        },
                        {
                          label: "Delete dashboard",
                          onClick: () => {
                            handleDeleteDashboard(dashboard.id);
                            closeContextMenu();
                          },
                          type: "item",
                          actionType: "delete",
                        },
                      ])
                    }
                  >
                    <img src={DashboardIcon} alt="Dashboard icon" />
                    <span>{dashboard.name}</span>
                  </NestedItem>
                ))
              ))}
            <SidebarTitle
              onClick={() => {
                getAllData();
                setConnectionsOpen(!connectionsOpen);
              }}
              onMouseEnter={() => setHoveredSection("connections")}
              onMouseLeave={() => setHoveredSection(null)}
              onContextMenu={() => {}}
            >
              <ArrowIcon
                isOpen={connectionsOpen}
                isArrow={hoveredSection === "connections"}
                src={
                  hoveredSection === "connections"
                    ? RightArrowIcon
                    : ConnectionsIcon
                }
                alt="Icon"
              />
              <span>{t("SENSORS")}</span>
            </SidebarTitle>
            {connectionsOpen &&
              (loadingConnections ? (
                <NestedItem>
                  <span>...</span>
                </NestedItem>
              ) : (
                connections.map((connection) => (
                  <NestedItem
                    key={connection.id}
                    onClick={() => navigate(`/connection/${connection.id}`)}
                    onContextMenu={() => {}}
                  >
                    <img src={ConnectionIcon} alt="Connection icon" />
                    <span>{connection.name}</span>
                  </NestedItem>
                ))
              ))}
            <SidebarTitle
              onClick={() => {
                getAllData();
                setAlertsOpen(!alertsOpen);
              }}
              onMouseEnter={() => setHoveredSection("alerts")}
              onMouseLeave={() => setHoveredSection(null)}
              onContextMenu={() => {}}
            >
              <ArrowIcon
                isOpen={alertsOpen}
                isArrow={hoveredSection === "alerts"}
                src={hoveredSection === "alerts" ? RightArrowIcon : AlertsIcon}
                alt="Icon"
              />
              <span>{t("ALERTS")}</span>
            </SidebarTitle>
            {alertsOpen &&
              (loadingConnections ? (
                <NestedItem>
                  <span>...</span>
                </NestedItem>
              ) : (
                connections.map((alert) => (
                  <NestedItem
                    key={alert.id}
                    onClick={() => navigate(`/alert/${alert.id}`)}
                    onContextMenu={() => {}}
                  >
                    <img src={AlertYellowIcon} alt="Alert icon" />
                    <span>{alert.name}</span>
                  </NestedItem>
                ))
              ))}
          </SidebarContent>
        </SidebarContentWrapper>
        <SidebarFooter isOpen={isOpen}>
          <UserInfo>
            <UserInitials>
              {user?.name[0]}
              {user?.surname[0]}
            </UserInitials>
            <UserName>
              {user?.name} {user?.surname}
            </UserName>
          </UserInfo>
          <SettingsIcon
            onClick={() => navigate("/settings")}
            src={SettingsIconImg}
            alt="Settings icon"
          />
        </SidebarFooter>
      </SidebarContainer>
      {contextMenu.visible && (
        <ContextMenu
          items={contextMenu.items}
          position={contextMenu.position}
          onClose={closeContextMenu}
        />
      )}
      <ConfirmDeleteSheetModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleConfirm={confirmDeleteSheet}
      />
      <ConfirmDeleteDashboardModal
        show={showDeleteDashboardModal}
        handleClose={() => setShowDeleteDashboardModal(false)}
        handleConfirm={confirmDeleteDashboard}
      />
      <ConfirmDeleteConnectionModal
        show={showDeleteConnectionModal}
        handleClose={() => setShowDeleteConnectionModal(false)}
        handleConfirm={confirmDeleteConnection}
      />
    </>
  );
};

export default Sidebar;
