import styled from "styled-components";

export const Menu = styled.div`
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

export const MenuItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;
