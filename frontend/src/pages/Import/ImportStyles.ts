import styled from "styled-components";

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
  padding: 6px 12px;
  border-radius: 5px;
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
