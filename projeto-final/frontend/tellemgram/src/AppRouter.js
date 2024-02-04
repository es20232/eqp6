import { ThemeProvider } from "@mui/material/styles";
import purpleTheme from "./Theme";

import { AuthProvider } from "./AuthContext";

import { AnimatePresence } from "framer-motion";

import { QueryClient, QueryClientProvider } from "react-query";

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
import NewPost from "./components/NewPost/NewPost";
import Post from "./components/PostsList/Post";
import PostsList from "./components/PostsList/PostsList";


function AppRouter() {
  const queryClient = new QueryClient();
  return (
    <ThemeProvider theme={purpleTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AnimatePresence>
            <BrowserRouter>
              <Routes>
                <Route path="/entrar" element={<LoginPage />} />
                <Route path="/cadastrar" element={<SignupPage />} />
                <Route path="/recuperar" element={<RecoverPage />} />
                <Route
                  path="/email-confirmado"
                  element={<EmailConfirmedPage />}
                />
                <Route element={<ProtectedRoutes />}>
                  <Route path="/" element={<HomePage />}>
                    <Route index element={<PostsList />} />
                    <Route path="nova-postagem" element={<NewPost />} />
                    <Route path="perfil/:userName" element={<Profile />} />
                    <Route path="meu-perfil" element={<Profile />} />
                    <Route path="meu-perfil/editar" element={<EditProfile />} />
                    <Route path="postagem/:postId" element={<Post />} />
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
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default AppRouter;
