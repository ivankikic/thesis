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

export const DashboardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
`;

export const DashboardContainer = styled.div<{ size: "1:1" | "1:2" }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px solid #d3d3d3;
  padding: 20px;
  border-radius: 10px;
  grid-column: ${({ size }) => (size === "1:1" ? "span 2" : "span 1")};
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  user-select: none;
`;
