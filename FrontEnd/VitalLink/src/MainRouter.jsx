import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import App from "./App.jsx";
import SignInForm from './components/SignInForm.jsx';
import DonorRegistrationForm from './components/DonorRegistrationForm.jsx';
import HospitalRegistrationForm from './components/HospitalRegistrationForm.jsx';
import DonorDashboard from './components/DonorDashboard.jsx';
import HospitalSignIn from "./components/HospitalSignIn.jsx";
import HospitalDashboard from "./components/HospitalDashboard.jsx";

function MainRouter() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [hospitalToken, setHospitalToken] = useState(localStorage.getItem("hospitalToken"));
  const [hospitalData, setHospitalData] = useState(
    JSON.parse(localStorage.getItem("hospitalData") || "{}")
  );
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  useEffect(() => {
  console.log("isAuthenticated:", isAuthenticated);
  console.log("user:", user);
}, [isAuthenticated, user]);


  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
      setHospitalToken(localStorage.getItem("hospitalToken"));
      setUser(JSON.parse(localStorage.getItem('user') || '{}'));
      setHospitalData(JSON.parse(localStorage.getItem("hospitalData") || "{}"));
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
 
  const handleHospitalSignOut = () => {
    localStorage.removeItem("hospitalToken");
    localStorage.removeItem("hospitalData");

    setHospitalToken(null);
    navigate("/SignAsHospital");
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

       <Route path="/SignAsHospital" element={<HospitalSignIn />} />
       <Route
        path="/hospital/dashboard"
        element={
          hospitalToken ? (
            <HospitalDashboard hospital={hospitalData} onSignOut={handleHospitalSignOut} />
          ) : (
            <Navigate to="/SignAsHospital" />
          )
        }
      />

    </Routes>
  );
}

export default MainRouter;
