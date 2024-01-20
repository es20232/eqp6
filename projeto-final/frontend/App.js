
//import './App.css';
import AuthPages from './routes/AuthRoutes';
import ProtectedRoutes from './routes/ProtectedRoutes';
// import Dashboard from './routes/Dashboard';
import{ createBrowserRouter, RouterProvider, Route, Routes, BrowserRouter, useLocation   } from 'react-router-dom';
import { AuthProvider } from './routes/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/*" element={<AuthPages />} />
          <Route element={<ProtectedRoutes />}>
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    
  );
}

export default App;
