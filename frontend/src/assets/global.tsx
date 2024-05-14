import { Global, css } from "@emotion/react";
import { cssReset } from "./cssReset";
import { theme } from "./theme";

export const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        ${cssReset};

        body {
          color: ${theme.colors.primaryColor};
          background-color: ${theme.colors.backgroundColor};
        }

        html,
        #root {
          scroll-behavior: smooth;
          height: 100%;
        }

        a {
          color: inherit;
          text-decoration: inherit;
        }

        .material-symbols-outlined {
          font-size: 30px;
        }

        input.no-spinners::-webkit-inner-spin-button,
        input.no-spinners::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input.no-spinners {
          -moz-appearance: textfield; /* This line is for Firefox */
        }

        .material-symbols-rounded {
          color: red;
          font-size: 36px;
          cursor: pointer;
        }

        .active-date {
          background-color: #f5dcc0;
        }
        .react-toggle-track {
          div {
            top: 8px;
          }
          div:last-child {
            right: 13px;
          }
          div:first-of-type {
            top: 7px;
            left: 4px;
          }
          @media (max-width: 1500px) {
            .material-symbols-outlined {
              font-size: 18px;
            }
          }
        }
      `}
    />
  );
};
