import React, { useState } from 'react';
import { Eye, EyeOff, Building2, Mail, Lock, AlertCircle } from 'lucide-react';
import axios from "axios";


const HospitalSignIn = () => {
  const [formData, setFormData] = useState({
    adminEmail: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

 const handleSubmit = async () => {
  const newErrors = {};

  if (!formData.adminEmail) {
    newErrors.adminEmail = "Admin email is required";
  } else if (!validateEmail(formData.adminEmail)) {
    newErrors.adminEmail = "Please enter a valid email address";
  }

  if (!formData.password) {
    newErrors.password = "Password is required";
  } else if (formData.password.length < 8) {
    newErrors.password = "Password must be at least 8 characters";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {
    setIsLoading(true);

    // 🔥 REAL LOGIN REQUEST
    const res = await axios.post("http://localhost:5000/api/hospitals/login", {
      officialEmail: formData.adminEmail,
      password: formData.password,
    });

    if (res.data.success) {
      // 💾 Save session
      localStorage.setItem("hospitalToken", res.data.token);
      localStorage.setItem("hospitalData", JSON.stringify(res.data.hospital));

      alert("Login Successful!");

      // 🔀 redirect to dashboard
      window.location.href = "/hospital/dashboard";
    } else {
      alert(res.data.message);
    }
  } catch (err) {
    console.error("Login error:", err);
    alert(err.response?.data?.message || "Login failed!");
  } finally {
    setIsLoading(false);
  }
};


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4 w-screen h-screen">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg transform rotate-12">
              <div className="absolute inset-2 bg-white rounded-md flex items-center justify-center">
                <div className="w-3 h-6 bg-red-600 rounded-full"></div>
                <div className="w-1.5 h-8 bg-red-600 rounded-full ml-1"></div>
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">VitalLink</h1>
          <p className="text-gray-600">Hospital Portal Sign In</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Building2 className="w-6 h-6 text-red-600" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Sign in to access your hospital dashboard
          </p>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email Address *
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="adminEmail"
                  value={formData.adminEmail}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                    errors.adminEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="admin@hospital.com"
                />
              </div>
              {errors.adminEmail && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.adminEmail}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className={`w-full pl-11 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                Forgot Password?
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-black hover:bg-gray-800 active:scale-95'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">New to VitalLink?</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button className="text-red-600 hover:text-red-700 font-semibold">
                Register your hospital
              </button>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Need help? Contact{' '}
            <button className="text-red-600 hover:text-red-700 font-medium">
              support@vitallink.com
            </button>
          </p>
        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-800">
              <p className="font-semibold mb-1">Account Verification Required</p>
              <p>Only verified hospital accounts can sign in. If you've just registered, please wait 2-5 business days for verification.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalSignIn;