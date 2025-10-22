import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import App from "./App.jsx";
import SignInForm from './components/SignInForm.jsx';
import DonorRegistrationForm from './components/DonorRegistrationForm.jsx';
import HospitalRegistrationForm from './components/HospitalRegistrationForm.jsx';
import DonorDashboard from './components/DonorDashboard.jsx';

function MainRouter() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  useEffect(() => {
  console.log("isAuthenticated:", isAuthenticated);
  console.log("user:", user);
}, [isAuthenticated, user]);


  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
      setUser(JSON.parse(localStorage.getItem('user') || '{}'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser({});
    navigate('/SignIn');
  };


  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/SignIn" element={<SignInForm />} />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <DonorDashboard
              userData={user}
              onSignOut={handleSignOut}
            />
          ) : (
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
