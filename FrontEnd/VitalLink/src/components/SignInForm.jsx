import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Phone, Lock, CheckCircle } from 'lucide-react';
import { useNavigate, Link } from "react-router-dom";

const SignInForm = ({ onBack, onSignInSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'emailOrPhone':
        // Check if it's an email or phone number
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        const isPhone = /^\d{10}$/.test(value);
        
        if (value === '') {
          newErrors[name] = 'Email or phone number is required';
        } else if (!isEmail && !isPhone) {
          newErrors[name] = 'Enter a valid email address or 10-digit phone number';
        } else {
          delete newErrors[name];
        }
        break;

      case 'password':
        if (value === '') {
          newErrors[name] = 'Password is required';
        } else if (value.length < 8) {
          newErrors[name] = 'Password must be at least 8 characters';
        } else {
          delete newErrors[name];
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    validateField('emailOrPhone', formData.emailOrPhone);
    validateField('password', formData.password);

    // Check if there are any errors
    const hasErrors = Object.keys(errors).length > 0 || !formData.emailOrPhone || !formData.password;
    
    if (!hasErrors) {
      // Simulate sign-in success
      setIsSignedIn(true);
      
      // Call success callback after a short delay to show success message
      setTimeout(() => {
        if (onSignInSuccess) {
          onSignInSuccess();
        }
      }, 2000);
    }
  };

  const getInputIcon = () => {
    if (!formData.emailOrPhone) return <Mail className="w-5 h-5 text-gray-400" />;
    
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailOrPhone);
    const isPhone = /^\d{10}$/.test(formData.emailOrPhone);
    
    if (isEmail) return <Mail className="w-5 h-5 text-red-600" />;
    if (isPhone) return <Phone className="w-5 h-5 text-red-600" />;
    return <Mail className="w-5 h-5 text-gray-400" />;
  };

  if (isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome Back!</h2>
          <p className="text-gray-600 mb-6">
            You have successfully signed in to VitalLink. 
            Redirecting you to your dashboard...
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-red-600 h-2 rounded-full animate-pulse" style={{width: '100%'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white w-screen h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg transform rotate-12">
                <div className="absolute inset-1 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-2 h-4 bg-red-600 rounded-full"></div>
                  <div className="w-1 h-6 bg-red-600 rounded-full ml-0.5"></div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">VitalLink</h1>
                <p className="text-sm text-gray-600">Sign In</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/")}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Sign In Form */}
      <div className="flex items-center justify-center min-h-screen px-4 py-12">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          {/* Welcome Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your VitalLink account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email or Phone Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address or Phone Number *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  {getInputIcon()}
                </div>
                <input
                  type="text"
                  name="emailOrPhone"
                  value={formData.emailOrPhone}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-3  text-gray-900 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                    errors.emailOrPhone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter email or 10-digit phone number"
                />
              </div>
              {errors.emailOrPhone && (
                <p className="text-red-500 text-sm mt-1">{errors.emailOrPhone}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-12 py-3  text-gray-900 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password Link
            <div className="text-right">
              <button
                type="button"
                className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
              >
                Forgot Password?
              </button>
            </div> */}

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg"
            >
              Sign In
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <button
              type="button"
              className="w-full border border-black text-white py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Create New Account
            </button>
          </form>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to VitalLink's{' '}
              <a href="#" className="text-red-600 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-red-600 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;