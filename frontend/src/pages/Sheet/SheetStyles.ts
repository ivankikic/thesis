import styled from "styled-components";

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
`;

export const PageContentTitle = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

export const SpreadsheetContainer = styled.div`
  overflow-x: auto;
  max-width: 100%;
  padding: 10px;
  background-color: #fff;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #33333355;
    border-radius: 4px;
  }

  .Spreadsheet {
    border-radius: 8px;
    overflow: hidden;
  }

  .Spreadsheet__header,
  .Spreadsheet__row,
  .Spreadsheet__cell {
    border: none;
    margin: 0;
    padding: 0;
  }

  .Spreadsheet__header {
    font-weight: bold;
    padding: 0 10px;
    color: #333333aa;
  }

  .Spreadsheet__row {
    &:first-child {
      font-weight: bold;
    }
  }

  .Spreadsheet__cell {
    &:first-child {
      background-color: #f0f0f055;
      font-weight: bold;
    }
  }

  .Spreadsheet__cell,
  .Spreadsheet__header {
    border: 1px solid #f0f0f0;
  }
`;
