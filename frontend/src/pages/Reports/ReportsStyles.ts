import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoaderOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050; /* Increased z-index */
`;

export const Loader = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  animation: ${spin} 2s linear infinite;
`;

export const LoaderText = styled.div`
  margin-top: 20px;
  color: #fff;
  font-size: 1.2rem;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

export const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ImportButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: flex-start;
  span {
    font-size: 0.8rem;
    color: #808080;
  }
`;

export const ImportButton = styled.div`
  padding: 10px 15px;
  border-radius: 12px;
  line-height: 14px;
  cursor: pointer;
  border: none;
  font-size: 0.9rem;
  background: #002666;
  color: #fff;
`;

export const PageContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const PageContentTitle = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

export const TableContainer = styled.div`
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid #ddd;
`;

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  font-size: 0.8rem;
`;

export const TableHeader = styled.th`
  &:not(:last-child) {
    border-right: 1px solid #ddd;
  }
  padding: 5px;
  padding-left: 10px;
  background-color: #fff;
  text-align: left;

  &.delete-column {
    width: 60px;
    padding-right: 10px;
  }
`;

export const DeleteButton = styled.button`
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  font-size: 0.9rem;
  background: #dc3545;
  color: #fff;
  img {
    width: 12px;
    height: 12px;
  }
`;

export const TableRow = styled.tr`
  &:not(:first-child) {
    border-top: 1px solid #ddd;
  }
`;

export const TableCell = styled.td`
  &:not(:last-child) {
    border-right: 1px solid #ddd;
  }
  padding: 8px;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 10px;

  &.delete-column {
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &.imported {
    font-weight: 600;
    color: #008000;
  }
  &.failed {
    font-weight: 600;
    color: #ff0000;
  }
`;

export const DataCell = styled(TableCell)`
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  padding-left: 10px;
`;
