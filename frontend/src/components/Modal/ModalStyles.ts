import styled, { css } from "styled-components";

const buttonVariants = {
  primary: css`
    background-color: #002666;
    color: #fff;
    &:hover {
      background-color: #002644;
    }
  `,
  secondary: css`
    background-color: #6c757d;
    color: #fff;
    &:hover {
      background-color: #5a6268;
    }
  `,
  error: css`
    background-color: #dc3545;
    color: #fff;
    &:hover {
      background-color: #bd2130;
    }
  `,
};

export const ModalButton = styled.button<{
  variant: "primary" | "secondary" | "error";
}>`
  font-size: 0.8rem;
  padding: 10px 15px;
  line-height: 14px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ variant }) => buttonVariants[variant]}
`;

export const Input = styled.input`
  width: 230px;
  padding: 3px 6px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  margin: 5px 5px;

  &.missing {
    outline: none;
    border-color: #dc3545;
  }

  &.input-error {
    border-color: #dc3545;
    outline: none;
    border: 1px solid #dc3545;
  }
`;

export const CustomSelectContainer = styled.div`
  position: relative;
  width: 230px;
`;

export const CustomSelectInput = styled.input`
  width: 100%;
  padding: 3px 6px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  margin: 5px 0;
`;

export const CustomSelectDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1000;
`;

export const CustomSelectOption = styled.div`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const Spacer = styled.div`
  height: 10px;
`;

export const ImportColumns = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Select = styled.select`
  width: 230px;
  padding: 3px 6px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  margin: 5px 5px;
`;

export const ColumnBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 15px;
  padding-right: 30px;
  line-height: 14px;
  border-radius: 12px;
  border: 1px solid #ccc;
  margin: 5px 5px;
  background-color: #f0f0f0;
`;

export const InfoContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-right: 30px;
  line-height: 14px;
  margin: 15px 0px;
  gap: 5px;
  span {
    font-size: 0.8rem;
  }

  img {
    width: 10px;
    height: 10px;
  }
`;

export const ColumnButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

export const ColumnButton = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? "#007bff" : "#f0f0f0")};
  color: ${({ selected }) => (selected ? "#fff" : "#000")};

  &:hover {
    background-color: ${({ selected }) => (selected ? "#0056b3" : "#e0e0e0")};
  }
`;

export const ColumnsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 10px;
`;
