import React, { useState } from 'react';
import { Heart, Eye, EyeOff, Upload, CheckCircle, User, Mail, Phone, MapPin, Calendar, Droplets, Lock, FileText, Camera } from 'lucide-react';
import { useNavigate, Link } from "react-router-dom";
const DonorRegistrationForm = ({ onBack, onSignIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    age: '',
    gender: '',
    dateOfBirth: '',
    bloodGroup: '',
    email: '',
    contactNo: '',
    aadhaarNumber: '',
    state: '',
    city: '',
    pincode: '',
    address: '',
    majorDisease: '',
    diseaseDetails: '',
    password: '',
    confirmPassword: '',
    photograph: null
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  
  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
    'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
    'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const majorCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur',
    'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna',
    'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivli',
    'Vasai-Virar', 'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad',
    'Howrah', 'Ranchi', 'Gwalior', 'Jabalpur', 'Coimbatore', 'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur',
    'Kota', 'Chandigarh', 'Guwahati', 'Solapur', 'Hubli-Dharwad', 'Tiruchirappalli', 'Bareilly', 'Mysore',
    'Tiruppur', 'Gurgaon', 'Aligarh', 'Jalandhar', 'Bhubaneswar', 'Salem', 'Warangal', 'Guntur', 'Bhiwandi',
    'Saharanpur', 'Gorakhpur', 'Bikaner', 'Amravati', 'Noida', 'Jamshedpur', 'Bhilai', 'Cuttack', 'Firozabad',
    'Kochi', 'Nellore', 'Bhavnagar', 'Dehradun', 'Durgapur', 'Asansol', 'Rourkela', 'Nanded', 'Kolhapur',
    'Ajmer', 'Akola', 'Gulbarga', 'Jamnagar', 'Ujjain', 'Loni', 'Siliguri', 'Jhansi', 'Ulhasnagar', 'Jammu'
  ];

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'firstName':
      case 'middleName':
      case 'lastName':
        if (!/^[A-Za-z\s]+$/.test(value) && value !== '') {
          newErrors[name] = 'Only alphabets and spaces allowed';
        } else {
          delete newErrors[name];
        }
        break;
      
      case 'age':
        if (!/^\d+$/.test(value) && value !== '') {
          newErrors[name] = 'Only numbers allowed';
        } else if (parseInt(value) < 18 || parseInt(value) > 65) {
          newErrors[name] = 'Age must be between 18-65 years';
        } else {
          delete newErrors[name];
        }
        break;

      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value !== '') {
          newErrors[name] = 'Please enter a valid email address';
        } else {
          delete newErrors[name];
        }
        break;

      case 'contactNo':
        if (!/^\d{10}$/.test(value) && value !== '') {
          newErrors[name] = 'Contact number must be 10 digits';
        } else {
          delete newErrors[name];
        }
        break;

      case 'aadhaarNumber':
        if (!/^\d{12}$/.test(value) && value !== '') {
          newErrors[name] = 'Aadhaar number must be 12 digits';
        } else {
          delete newErrors[name];
        }
        break;

      case 'pincode':
        if (!/^\d{6}$/.test(value) && value !== '') {
          newErrors[name] = 'Pincode must be 6 digits';
        } else {
          delete newErrors[name];
        }
        break;

      case 'password':
        if (value.length < 8 && value !== '') {
          newErrors[name] = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value) && value !== '') {
          newErrors[name] = 'Password must contain uppercase, lowercase, and number';
        } else {
          delete newErrors[name];
        }
        break;

      case 'confirmPassword':
        if (value !== formData.password && value !== '') {
          newErrors[name] = 'Passwords do not match';
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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
        setFormData(prev => ({ ...prev, photograph: file }));
        delete errors.photograph;
      } else {
        setErrors(prev => ({ ...prev, photograph: 'Only JPG/JPEG files allowed' }));
      }
    }
  };

  const validateStep = (step) => {
    const stepFields = {
      1: ['firstName', 'lastName', 'age', 'gender', 'dateOfBirth', 'bloodGroup'],
      2: ['email', 'contactNo', 'aadhaarNumber'],
      3: ['state', 'city', 'pincode', 'address'],
      4: ['majorDisease', 'password', 'confirmPassword', 'photograph']
    };

    const fieldsToValidate = stepFields[step];
    let isValid = true;
    const newErrors = { ...errors };

    fieldsToValidate.forEach(field => {
      if (!formData[field] || (field === 'majorDisease' && formData[field] === 'yes' && !formData.diseaseDetails)) {
        newErrors[field] = 'This field is required';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    if (validateStep(4)) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Registration Successful!</h2>
          <p className="text-gray-600 mb-6">
            Welcome to VitalLink! Your donor profile has been created successfully. 
            You can now sign in to access your account.
          </p>
          <button
            onClick={onSignIn}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
          >
            Sign In Now
          </button>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <User className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800">Personal Information</h3>
              <p className="text-gray-600">Tell us about yourself</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full p-3  text-gray-900 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent  ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`  }
                  placeholder="Enter first name"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Middle Name
                </label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  className="w-full p-3  text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter middle name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full p-3  text-gray-900 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter last name"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age *
                </label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className={`w-full p-3  text-gray-900 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    errors.age ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter age (18-65)"
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`w-full p-3  text-gray-900 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    errors.gender ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={`w-full p-3  text-gray-900 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Group *
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  className={`w-full p-3  text-gray-900 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    errors.bloodGroup ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select blood group</option>
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
                {errors.bloodGroup && <p className="text-red-500 text-sm mt-1">{errors.bloodGroup}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Mail className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800">Contact Information</h3>
              <p className="text-gray-600">How can we reach you?</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-3  text-gray-900 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter email address"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number *
              </label>
              <input
                type="text"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleInputChange}
                className={`w-full p-3  text-gray-900 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  errors.contactNo ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter 10-digit contact number"
              />
              {errors.contactNo && <p className="text-red-500 text-sm mt-1">{errors.contactNo}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aadhaar Number *
              </label>
              <input
                type="text"
                name="aadhaarNumber"
                value={formData.aadhaarNumber}
                onChange={handleInputChange}
                className={`w-full p-3  text-gray-900 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  errors.aadhaarNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter 12-digit Aadhaar number"
              />
              {errors.aadhaarNumber && <p className="text-red-500 text-sm mt-1">{errors.aadhaarNumber}</p>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <MapPin className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800">Address Information</h3>
              <p className="text-gray-600">Where are you located?</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`w-full p-3  text-gray-900 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    errors.state ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select state</option>
                  {indianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select city</option>
                  {majorCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pincode *
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                className={`w-full p-3  text-gray-900 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  errors.pincode ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter 6-digit pincode"
              />
              {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
                className={`w-full p-3  text-gray-900 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter complete address"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <FileText className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800">Medical & Security</h3>
              <p className="text-gray-600">Final details to complete your profile</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Any Major Disease? *
              </label>
              <select
                name="majorDisease"
                value={formData.majorDisease}
                onChange={handleInputChange}
                className={`w-full p-3  text-gray-900 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  errors.majorDisease ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select option</option>
                <option value="no">No</option>
                <option value="yes">Yes (Specify)</option>
              </select>
              {errors.majorDisease && <p className="text-red-500 text-sm mt-1">{errors.majorDisease}</p>}
            </div>

            {formData.majorDisease === 'yes' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Disease Details *
                </label>
                <textarea
                  name="diseaseDetails"
                  value={formData.diseaseDetails}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-3  text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Please specify the disease details"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Create Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full p-3  text-gray-900 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent pr-12 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full p-3  text-gray-900 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent pr-12 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Photograph (JPG/JPEG) *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-500 transition-colors">
                <input
                  type="file"
                  accept=".jpg,.jpeg"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="photograph"
                />
                <label htmlFor="photograph" className="cursor-pointer">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    {formData.photograph ? formData.photograph.name : 'Click to upload photograph'}
                  </p>
                  <p className="text-sm text-gray-500">JPG or JPEG format only</p>
                </label>
              </div>
              {errors.photograph && <p className="text-red-500 text-sm mt-1">{errors.photograph}</p>}
            </div> */}
          </div>
        );

      default:
        return null;
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-red-50 to-white w-screen ">
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
              <p className="text-sm text-gray-600">Donor Registration</p>
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

    {/* Progress Bar */}
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3, 4].map((step, index) => (
          <div key={step} className="flex items-center">
            {/* Step Circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                currentStep >= step
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {step}
            </div>

            {/* Connector line except after the last step */}
            {index < 3 && (
              <div
                className={`w-16 h-1 ${
                  currentStep > step ? "bg-red-600" : "bg-gray-200"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-10">
          {currentStep > 1 ? (
            <button
              onClick={prevStep}
              className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              onClick={nextStep}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);
};

export default DonorRegistrationForm;