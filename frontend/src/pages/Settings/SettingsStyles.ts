import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  img {
    width: 15px;
    height: 15px;
    margin-right: 10px;
  }
`;

export const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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

export const LanguageButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const LanguageButton = styled.button`
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  font-size: 0.9rem;
  &.active {
    background: #002666;
    color: #fff;
  }
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
  &:not(:first-child) {
    border-left: 1px solid #ddd;
  }
  &:not(:last-child) {
    border-right: 1px solid #ddd;
  }
  padding: 5px;
  padding-left: 10px;
  background-color: #fff;
  text-align: left;
`;

export const TableRow = styled.tr`
  &:not(:first-child) {
    border-top: 1px solid #ddd;
  }
`;

export const TableCell = styled.td`
  &:not(:first-child) {
    border-left: 1px solid #ddd;
  }
  &:not(:last-child) {
    border-right: 1px solid #ddd;
  }
  padding: 8px;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 10px;
`;

export const DataCell = styled(TableCell)`
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  padding-left: 10px;
`;

export const DatePickerContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  margin-bottom: 20px;
`;

export const CustomDatePicker = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  span {
    font-size: 0.7rem;
    color: #777;
  }
  .react-datepicker {
    border-radius: 10px;
    border: 1px solid #ddd;
  }

  .react-datepicker__header {
    background-color: #007bff;
    border-bottom: 1px solid #ddd;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color: #fff;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: #007bff;
    color: #fff;
  }

  .react-datepicker__day--today {
    font-weight: bold;
  }

  .react-datepicker__day {
    border-radius: 50%;
  }

  .react-datepicker__day-name {
    color: #fff;
  }

  .react-datepicker__current-month,
  .react-datepicker-time__header,
  .react-datepicker-year-header {
    color: #fff;
  }
`;

export const StyledDatePickerInput = styled.input`
  border-radius: 8px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
`;
