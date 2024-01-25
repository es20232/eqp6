import { ThemeProvider } from "@mui/material/styles";
import purpleTheme from "./Theme";

import { AuthProvider } from "./AuthContext";

import { AnimatePresence } from "framer-motion";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import RecoverPage from "./pages/RecoverPage";
import ProtectedRoutes from "./ProtectedRoutes";
import HomePage from "./pages/HomePage";
import TokenManagerPage from "./pages/TokenManagerPage";
import FileUploadPage from "./pages/FileUploadPage";
import EditProfile from "./components/EditProfile/EditProfile";
import Profile from "./components/Profile/Profile";
import Initial from "./components/Initial/Initial";
import EmailConfirmedPage from "./pages/EmailConfirmedPage";
import ErrorPage from "./pages/ErrorPage";
function AppRouter() {
  return (
    <ThemeProvider theme={purpleTheme}>
      <AuthProvider>
        <AnimatePresence>
          <BrowserRouter>
            <Routes>
              <Route path="/entrar" element={<LoginPage />} />
              <Route path="/cadastrar" element={<SignupPage />} />
              <Route path="/recuperar" element={<RecoverPage />} />
              <Route path="/email-confirmado" element={<EmailConfirmedPage />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<HomePage />} >
                  <Route index element={<Initial />} />
                  <Route path="perfil/:userId" element={<Profile />} />
                  <Route path="perfil/editar" element={<EditProfile />} />
                </Route>
                <Route path="/minhasimagens" element={<HomePage />} />
                <Route path="/token" element={<TokenManagerPage />} />
                <Route path="/carregar" element={<FileUploadPage />} />
              </Route>
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </BrowserRouter>
        </AnimatePresence>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default AppRouter;
