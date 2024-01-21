import{ Route, Routes, BrowserRouter} from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RecoverPage from './pages/RecoverPage';
import { AnimatePresence } from "framer-motion";
import ProtectedRoutes from './ProtectedRoutes';
import HomePage from './pages/HomePage';
import TokenManagerPage from './pages/TokenManagerPage';
import FileUploadPage from './pages/FileUploadPage';

function AppRouter() {
  return (
    <AuthProvider>
        <AnimatePresence>
          <BrowserRouter>
            <Routes>
              <Route path="/entrar" element={<LoginPage />} />
              <Route path="/cadastrar" element={<SignupPage />} />
              <Route path="/recuperar" element={<RecoverPage />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/token" element={<TokenManagerPage />} />
                <Route path="/carregar" element={<FileUploadPage />} />
              </Route> 
            </Routes>
          </BrowserRouter>
        </AnimatePresence>
    </AuthProvider>
  );
}

export default AppRouter;
