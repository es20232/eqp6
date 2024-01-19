import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Router

import Home from "./routes/Home"
import SignIn from "./routes/SignIn"
import AuthPages from './routes/AuthPages';
import SignUp from './routes/SignUp';
import Recover from './routes/Recover';
import ErrorPage from './routes/ErrorPage';

import { TransitionGroup, CSSTransition } from 'react-transition-group';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<AuthPages />} />
        <Route path="/*" element={<App />} /> 
      </Routes>
    </BrowserRouter> */}
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
