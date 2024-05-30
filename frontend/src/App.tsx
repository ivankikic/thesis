import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./router/Routes";
import { AuthProvider } from "./auth/AuthProvider";
import { GlobalStyle } from "./assets/global";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <GlobalStyle />
        <Toaster />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
