import styled, { keyframes } from "styled-components";

export const FullPageLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #081633;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
  z-index: 1000; // Ensure it covers other content
  text-align: center;
`;

export const LoaderText = styled.div`
  margin-top: 20px;
  font-size: 16px;
`;

const dotsAnimation = keyframes`
  0%, 20% {
    content: '';
  }
  40% {
    content: '.';
  }
  60% {
    content: '..';
  }
  80%, 100% {
    content: '...';
  }
`;

export const AnimatedDots = styled.div`
  &:after {
    content: "";
    animation: ${dotsAnimation} 1.5s infinite;
  }
`;
