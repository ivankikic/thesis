import styled from "styled-components";

export const Menu = styled.div`
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 200px;
  border-radius: 8px;
  padding: 5px;
  font-size: 14px;

  img {
    width: 16px;
    height: 16px;
  }
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 5px;
  &:hover {
    background: #f0f0f0;
  }
`;

export const MenuIcon = styled.img`
  margin-right: 8px;
  width: 16px;
  height: 16px;
`;

export const MenuInput = styled.input`
  padding: 4px 8px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccccccaa;
  border-radius: 10px;
  outline: none;
  margin: 4px 0;
`;

export const MenuDropdown = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  border-radius: 5px;
  justify-content: space-between;
  &:hover {
    background: #f0f0f0;
  }
  > span {
    padding: 4px 8px;
    cursor: pointer;
    display: block;
  }
`;

export const SubMenu = styled.div`
  position: absolute;
  top: 0;
  left: 100%;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 200px;
  border-radius: 8px;
  padding: 5px;
`;

export const MenuDivider = styled.div`
  height: 1px;
  background: #ccccccaa;
  margin: 8px 0;
`;
