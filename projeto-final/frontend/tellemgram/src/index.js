import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Router
import{ createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from "./routes/Home"
import SignIn from "./routes/SignIn"
import AuthPages from './routes/AuthPages';
import SignUp from './routes/SignUp';
import Recover from './routes/Recover';
import ErrorPage from './routes/ErrorPage';


const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPages />,
    children: [
      {
        path: "/auth/entrar",
        element: <SignIn />
      },
      {
        path: "/auth/cadastrar",
        element: <SignUp/>
      },
      {
        path: "/auth/recuperar",
        element: <Recover />
      }
    ]
  },
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  }


])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
