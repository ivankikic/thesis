import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./router/Routes";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./auth/AuthProvider";
import { GlobalStyle } from "./assets/global";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./assets/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <GlobalStyle />
          <ToastContainer />
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
