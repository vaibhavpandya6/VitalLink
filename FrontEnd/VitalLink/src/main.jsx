import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import SignInForm from './components/SignInForm.jsx';
import DonorRegistrationForm from './components/DonorRegistrationForm.jsx';
import HospitalRegistrationForm from './components/HospitalRegistrationForm.jsx';
import DonorDashboard from './components/DonorDashboard.jsx';
import MainRouter from './MainRouter.jsx';
createRoot(document.getElementById('root')).render(
   <BrowserRouter>
    <MainRouter />
  </BrowserRouter>
)
