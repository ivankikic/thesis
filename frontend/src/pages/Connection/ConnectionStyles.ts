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

export const PageContentSubtitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #a9a9a9;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
  .status-label {
    color: #a9a9a9;
  }

  .status-active {
    color: #7ad830;
  }

  .status-inactive {
    color: #dc3545;
  }
`;

export const PageContentItem = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

export const PageContentSwitch = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 20px;
`;
