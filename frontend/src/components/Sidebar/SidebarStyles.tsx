import styled from "styled-components";
import { theme } from "../../assets/theme";

export const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: ${(props) => (props.isOpen ? "250px" : "0")};
  height: 100%;
  background-color: ${theme.colors.primary};
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 10px;
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
