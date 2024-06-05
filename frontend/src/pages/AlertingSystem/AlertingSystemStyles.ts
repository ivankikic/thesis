import styled from "styled-components";

export const SensorCard = styled.div`
  width: 100%;
  border-radius: 10px;
  background-color: #002666;
  margin-bottom: 10px;
  cursor: pointer;
  color: #fff;
`;

export const AlertHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 20px 30px;

  img {
    transition: transform 0.3s ease;
  }

  .rotated {
    transform: rotate(90deg);
  }
`;

export const AlertSection = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  background-color: #f9f9f9;
  padding: 20px;
  color: #333;
`;

export const AlertInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const AlertInputTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

export const AlertInputContent = styled.div`
  display: flex;
  gap: 10px;
`;

export const AlertInputContentSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AlertInputLabel = styled.label`
  font-size: 11px;
  font-weight: 600;
`;

export const AlertInput = styled.input`
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
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

export const PageContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const PageContentTitle = styled.span`
  font-size: 20px;
  font-weight: 600;
`;
