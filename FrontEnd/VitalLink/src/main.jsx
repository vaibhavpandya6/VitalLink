import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInForm from './components/SignInForm.jsx';
import DonorRegistrationForm from './components/DonorRegistrationForm.jsx';
import HospitalRegistrationForm from './components/HospitalRegistrationForm.jsx';


createRoot(document.getElementById('root')).render(
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="/SignIn" element={<SignInForm/>}/>
      <Route path="/SignUp" element={<DonorRegistrationForm/>}/>
      <Route path="/HospitalRegistration" element={<HospitalRegistrationForm/>}/>
    </Routes>
  </BrowserRouter>
)
