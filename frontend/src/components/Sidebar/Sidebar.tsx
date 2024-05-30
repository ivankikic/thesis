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
} from "./SidebarStyles";
import FarmsenseLogo from "/big_logo_w.svg";
import ImportIcon from "/icons/import.svg";
import ConnectIcon from "/icons/connect.svg";
import SettingsIcon from "/icons/settings.svg";
import SheetIcon from "/icons/sheet.svg";
import DashboardIcon from "/icons/dashboard.svg";
import RightArrowIcon from "/icons/arrow.svg";

// Temp data
const sheets = ["Sheet 1", "Sheet 2", "Sheet 3"];
const dashboards = ["Dashboard 1", "Dashboard 2", "Dashboard 3"];

const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [sheetsOpen, setSheetsOpen] = useState(false);
  const [dashboardsOpen, setDashboardsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <OpenButton onClick={() => setIsOpen(true)}>{">>"}</OpenButton>
      )}
      <SidebarContainer isOpen={isOpen}>
        <Logo>
          <img src={FarmsenseLogo} alt="Farmsense Logo" />
        </Logo>
        <ToggleButton onClick={() => setIsOpen(false)}>{"<<"}</ToggleButton>
        <SidebarContent isOpen={isOpen}>
          <SidebarItem>
            <img src={ImportIcon} alt="Import icon" />
            <span>Import</span>
          </SidebarItem>
          <SidebarItem>
            <img src={ConnectIcon} alt="Connect icon" />
            <span>Connect</span>
          </SidebarItem>
          <SidebarItem>
            <img src={SettingsIcon} alt="Settings icon" />
            <span>Settings</span>
          </SidebarItem>
          <SidebarDivider />
          <SidebarTitle onClick={() => setSheetsOpen(!sheetsOpen)}>
            <ArrowIcon
              isOpen={sheetsOpen}
              src={RightArrowIcon}
              alt="Arrow icon"
            />
            <span>Sheets</span>
          </SidebarTitle>
          {sheetsOpen &&
            sheets.map((sheet) => (
              <NestedItem key={sheet}>
                <img src={SheetIcon} alt="Sheet icon" />
                <span>{sheet}</span>
              </NestedItem>
            ))}
          <SidebarTitle onClick={() => setDashboardsOpen(!dashboardsOpen)}>
            <ArrowIcon
              isOpen={dashboardsOpen}
              src={RightArrowIcon}
              alt="Arrow icon"
            />
            <span>Dashboards</span>
          </SidebarTitle>
          {dashboardsOpen &&
            dashboards.map((dashboard) => (
              <NestedItem key={dashboard}>
                <img src={DashboardIcon} alt="Dashboard icon" />
                <span>{dashboard}</span>
              </NestedItem>
            ))}
        </SidebarContent>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
