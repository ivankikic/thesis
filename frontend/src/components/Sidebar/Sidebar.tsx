import {
  SidebarContainer,
  Logo,
  ToggleButton,
  OpenButton,
} from "./SidebarStyles";
import FarmsenseLogo from "/big_logo_w.svg";

const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
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
        {/* Add your sidebar content here */}
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
