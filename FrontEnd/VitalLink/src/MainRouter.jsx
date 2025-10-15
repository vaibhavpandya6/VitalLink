import { useState, useEffect } from "react";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import SignInForm from './components/SignInForm.jsx';
import DonorRegistrationForm from './components/DonorRegistrationForm.jsx';
import HospitalRegistrationForm from './components/HospitalRegistrationForm.jsx';
import DonorDashboard from './components/DonorDashboard.jsx';

function MainRouter() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
      setUser(JSON.parse(localStorage.getItem('user') || '{}'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/SignIn" element={<SignInForm />} />
      <Route
        path="/dashboard"
        element={
    localStorage.getItem('token') ? (
      <DonorDashboard
        userData={JSON.parse(localStorage.getItem('user') || '{}')}
        onSignOut={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/SignIn';
        }}
      />
    )  : (
            <Navigate to="/SignIn" />
          )
        }
      />
      <Route path="/SignUp" element={<DonorRegistrationForm />} />
      <Route path="/HospitalRegistration" element={<HospitalRegistrationForm />} />
    </Routes>
  );
}
export default MainRouter;
