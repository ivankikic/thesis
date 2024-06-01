import { useState } from "react";
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
  addNewConnection,
  duplicateConnection,
  deleteConnection,
  renameConnection,
} from "../../contexts/ContextMenu/ContextMenuFunctions";
import ContextMenu from "../../contexts/ContextMenu/ContextMenu";

const sheets = ["Sheet 1", "Sheet 2", "Sheet 3"];
const dashboards = ["Dashboard 1", "Dashboard 2", "Dashboard 3"];
const connections = ["Connection 1", "Connection 2", "Connection 3"];

const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [sheetsOpen, setSheetsOpen] = useState(false);
  const [dashboardsOpen, setDashboardsOpen] = useState(false);
  const [connectionsOpen, setConnectionsOpen] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const { user } = useAuthContext();

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
            <Logo>
              <img src={FarmsenseLogo} alt="Farmsense Logo" />
            </Logo>
            <ToggleButton onClick={() => setIsOpen(false)}>{"<<"}</ToggleButton>
          </SidebarContentHeader>
          <FixedSection>
            <SidebarItem>
              <img src={ImportIcon} alt="Import icon" />
              <span>Import</span>
            </SidebarItem>
            <SidebarItem>
              <img src={ConnectIcon} alt="Connect icon" />
              <span>Connect</span>
            </SidebarItem>
            <SidebarItem>
              <img src={AlertIcon} alt="Alert system icon" />
              <span>Alert system</span>
            </SidebarItem>
            <SidebarDivider />
          </FixedSection>
          <SidebarContent isOpen={isOpen}>
            <SidebarTitle
              onClick={() => setSheetsOpen(!sheetsOpen)}
              onMouseEnter={() => setHoveredSection("sheets")}
              onMouseLeave={() => setHoveredSection(null)}
              onContextMenu={(e) =>
                handleContextMenu(e, [
                  {
                    label: "Add new sheet",
                    onClick: addNewSheet,
                    type: "item",
                    actionType: "add_sheet",
                  },
                  { type: "divider" },
                  {
                    label: "Duplicate sheet",
                    onClick: () => duplicateSheet("Sheet"),
                    type: "item",
                    actionType: "duplicate",
                  },
                  {
                    label: "Delete sheet",
                    onClick: () => deleteSheet("Sheet"),
                    type: "item",
                    actionType: "delete",
                  },
                  {
                    type: "input",
                    placeholder: "Search...",
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                      console.log(e.target.value),
                  },
                  {
                    type: "dropdown",
                    label: "More options",
                    isOpen: true,
                    items: [
                      {
                        label: "Option 1",
                        onClick: () => console.log("Option 1"),
                      },
                      {
                        label: "Option 2",
                        onClick: () => console.log("Option 2"),
                      },
                    ],
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
              <span>Sheets</span>
            </SidebarTitle>
            {sheetsOpen &&
              sheets.map((sheet) => (
                <NestedItem
                  key={sheet}
                  onContextMenu={(e) =>
                    handleContextMenu(e, [
                      {
                        label: "Rename sheet",
                        onClick: () => renameSheet(sheet),
                        type: "input",
                        actionType: "rename",
                      },
                      { type: "divider" },
                      {
                        label: "Duplicate sheet",
                        onClick: () => duplicateSheet(sheet),
                        type: "item",
                        actionType: "duplicate",
                      },
                      {
                        label: "Delete sheet",
                        onClick: () => deleteSheet(sheet),
                        type: "item",
                        actionType: "delete",
                      },
                    ])
                  }
                >
                  <img src={SheetIcon} alt="Sheet icon" />
                  <span>{sheet}</span>
                </NestedItem>
              ))}
            <SidebarTitle
              onClick={() => setDashboardsOpen(!dashboardsOpen)}
              onMouseEnter={() => setHoveredSection("dashboards")}
              onMouseLeave={() => setHoveredSection(null)}
              onContextMenu={(e) =>
                handleContextMenu(e, [
                  {
                    label: "Add new dashboard",
                    onClick: addNewDashboard,
                    type: "item",
                    actionType: "add_dashboard",
                  },
                  { type: "divider" },
                  {
                    label: "Duplicate dashboard",
                    onClick: () => duplicateDashboard("Dashboard"),
                    type: "item",
                    actionType: "duplicate",
                  },
                  {
                    label: "Delete dashboard",
                    onClick: () => deleteDashboard("Dashboard"),
                    type: "item",
                    actionType: "delete",
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
              <span>Dashboards</span>
            </SidebarTitle>
            {dashboardsOpen &&
              dashboards.map((dashboard) => (
                <NestedItem
                  key={dashboard}
                  onContextMenu={(e) =>
                    handleContextMenu(e, [
                      {
                        label: "Rename dashboard",
                        onClick: () => renameDashboard(dashboard),
                        type: "input",
                      },
                      { type: "divider" },
                      {
                        label: "Duplicate dashboard",
                        onClick: () => duplicateDashboard(dashboard),
                        type: "item",
                        actionType: "duplicate",
                      },
                      {
                        label: "Delete dashboard",
                        onClick: () => deleteDashboard(dashboard),
                        type: "item",
                        actionType: "delete",
                      },
                    ])
                  }
                >
                  <img src={DashboardIcon} alt="Dashboard icon" />
                  <span>{dashboard}</span>
                </NestedItem>
              ))}
            <SidebarTitle
              onClick={() => setConnectionsOpen(!connectionsOpen)}
              onMouseEnter={() => setHoveredSection("connections")}
              onMouseLeave={() => setHoveredSection(null)}
              onContextMenu={(e) =>
                handleContextMenu(e, [
                  {
                    label: "Add new connection",
                    onClick: addNewConnection,
                    type: "item",
                    actionType: "add_connection",
                  },
                  { type: "divider" },
                  {
                    label: "Duplicate connection",
                    onClick: () => duplicateConnection("Connection"),
                    type: "item",
                    actionType: "duplicate",
                  },
                  {
                    label: "Delete connection",
                    onClick: () => deleteConnection("Connection"),
                    type: "item",
                    actionType: "delete",
                  },
                ])
              }
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
              <span>Connections</span>
            </SidebarTitle>
            {connectionsOpen &&
              connections.map((connection) => (
                <NestedItem
                  key={connection}
                  onContextMenu={(e) =>
                    handleContextMenu(e, [
                      {
                        label: "Rename connection",
                        onClick: () => renameConnection(connection),
                        type: "input",
                      },
                      { type: "divider" },
                      {
                        label: "Duplicate connection",
                        onClick: () => duplicateConnection(connection),
                        type: "item",
                        actionType: "duplicate",
                      },
                      {
                        label: "Delete connection",
                        onClick: () => deleteConnection(connection),
                        type: "item",
                        actionType: "delete",
                      },
                    ])
                  }
                >
                  <img src={ConnectionIcon} alt="Connection icon" />
                  <span>{connection}</span>
                </NestedItem>
              ))}
          </SidebarContent>
        </SidebarContentWrapper>
        <SidebarFooter isOpen={isOpen}>
          <UserInfo>
            <UserInitials>
              {user.name[0]}
              {user.surname[0]}
            </UserInitials>
            <UserName>
              {user.name} {user.surname}
            </UserName>
          </UserInfo>
          <SettingsIcon src={SettingsIconImg} alt="Settings icon" />
        </SidebarFooter>
      </SidebarContainer>
      {contextMenu.visible && (
        <ContextMenu
          items={contextMenu.items}
          position={contextMenu.position}
          onClose={closeContextMenu}
        />
      )}
    </>
  );
};

export default Sidebar;
