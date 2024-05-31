import styled from "styled-components";
import { theme } from "../../assets/theme";

export const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: ${(props) => (props.isOpen ? "300px" : "0")};
  height: 100%;
  background-color: ${theme.colors.primary};
  overflow: hidden;
  transition: width 0.3s;
  display: flex;
  flex-direction: column;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;

export const SidebarContentWrapper = styled.div<{ isOpen: boolean }>`
  flex: 1;
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  transition: opacity 0.25s;
`;

export const SidebarContent = styled.div<{ isOpen: boolean }>`
  flex: 1;
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  transition: opacity 0.25s;
  padding: 10px 10px;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #888 #444;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #444;
    border-radius: 10px; /* Za zaobljene ivice trake */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
    border: 2px solid #444;
  }

  /* Uklanjanje strelica na vrhu i dnu scrollbara */
  &::-webkit-scrollbar-button {
    display: none;
    width: 0;
    height: 0;
  }
`;

export const FixedSection = styled.div`
  position: sticky;
  top: 0;
  background-color: ${theme.colors.primary};
  z-index: 1;
  padding: 0 10px;
`;

export const SidebarFooter = styled.div<{ isOpen: boolean }>`
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  transition: opacity 0.25s;
  border-top: 1px solid #b6b6b655;
  padding: 15px;
  background-color: ${theme.colors.primary};
  color: #e6ebf2;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SidebarTitle = styled.div`
  display: flex;
  align-items: center;
  color: #e6ebf2;
  font-size: 14px;
  margin-bottom: 5px;
  padding: 2px 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #b6b6b655;
  }

  img {
    margin-right: 8px;
  }
`;

export const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  color: #e6ebf2;
  cursor: pointer;
  padding: 2px 10px;
  border-radius: 5px;
  font-size: 14px;
  gap: 8px;
  &:hover {
    background-color: #b6b6b655;
  }

  img {
    width: 14px;
  }
`;

export const SidebarDivider = styled.div`
  height: 1px;
  background-color: #b6b6b655;
  margin: 10px 0;
`;

export const Logo = styled.div`
  width: 100%;
  text-align: center;
  padding: 10px 20px;
  color: #fff;
  img {
    width: 130px;
  }
`;

export const ToggleButton = styled.div`
  position: absolute;
  top: 20px;
  right: 10px;
  width: 30px;
  height: 30px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #b6b6b655;
  }
`;

export const OpenButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: white;
  border: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #b6b6b6;
  }
`;

export const NestedItem = styled.div`
  display: flex;
  align-items: center;
  color: #e6ebf2;
  cursor: pointer;
  padding: 2px 20px;
  border-radius: 5px;
  font-size: 14px;
  gap: 8px;
  &:hover {
    background-color: #b6b6b655;
  }

  img {
    width: 12px;
  }
`;

export const ArrowIcon = styled.img<{ isOpen: boolean; isArrow: boolean }>`
  width: 13px;
  transform: ${(props) =>
    props.isArrow ? (props.isOpen ? "rotate(90deg)" : "rotate(0deg)") : "none"};
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const UserInitials = styled.div`
  width: 25px;
  height: 25px;
  background-color: white;
  color: ${theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 12px;
`;

export const UserName = styled.div`
  font-size: 12px;
`;

export const SettingsIcon = styled.img`
  width: 15px;
  height: 15px;
  cursor: pointer;
`;
