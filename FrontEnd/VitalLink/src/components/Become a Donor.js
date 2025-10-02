import React, { useState } from 'react';
import { Heart, Eye, EyeOff, Upload, CheckCircle, User, Mail, Phone, MapPin, Calendar, Droplets, Lock, FileText, Camera } from 'lucide-react';

const DonorRegistrationForm = ({ onBack, onSignIn }) => {
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
  
  const statesAndCities = {
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Rajahmundry', 'Tirupati', 'Kakinada', 'Kadapa', 'Anantapur'],
    'Arunachal Pradesh': ['Itanagar', 'Naharlagun', 'Pasighat', 'Tawang', 'Ziro', 'Bomdila', 'Tezu', 'Seppa', 'Changlang', 'Roing'],
    'Assam': ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon', 'Tinsukia', 'Tezpur', 'Bongaigaon', 'Sivasagar', 'Goalpara'],
    'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Purnia', 'Bihar Sharif', 'Arrah', 'Begusarai', 'Katihar'],
    'Chhattisgarh': ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg', 'Rajnandgaon', 'Jagdalpur', 'Raigarh', 'Ambikapur', 'Dhamtari'],
    'Delhi': ['New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi', 'Central Delhi', 'North West Delhi', 'North East Delhi', 'South West Delhi', 'Shahdara'],
    'Goa': ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda', 'Bicholim', 'Curchorem', 'Sanquelim', 'Cuncolim', 'Quepem'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Junagadh', 'Gandhinagar', 'Anand', 'Navsari'],
    'Haryana': ['Faridabad', 'Gurgaon', 'Panipat', 'Ambala', 'Yamunanagar', 'Rohtak', 'Hisar', 'Karnal', 'Sonipat', 'Panchkula'],
    'Himachal Pradesh': ['Shimla', 'Dharamshala', 'Solan', 'Mandi', 'Palampur', 'Kullu', 'Baddi', 'Nahan', 'Una', 'Hamirpur'],
    'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Phusro', 'Hazaribagh', 'Giridih', 'Ramgarh', 'Medininagar'],
    'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum', 'Gulbarga', 'Davanagere', 'Bellary', 'Bijapur', 'Shimoga'],
    'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Palakkad', 'Alappuzha', 'Kannur', 'Malappuram', 'Kottayam'],
    'Madhya Pradesh': ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas', 'Satna', 'Ratlam', 'Rewa'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Solapur', 'Kolhapur', 'Amravati', 'Nanded'],
    'Manipur': ['Imphal', 'Thoubal', 'Bishnupur', 'Churachandpur', 'Kakching', 'Ukhrul', 'Senapati', 'Tamenglong', 'Chandel', 'Jiribam'],
    'Meghalaya': ['Shillong', 'Tura', 'Nongstoin', 'Jowai', 'Baghmara', 'Williamnagar', 'Nongpoh', 'Mairang', 'Resubelpara', 'Khliehriat'],
    'Mizoram': ['Aizawl', 'Lunglei', 'Champhai', 'Serchhip', 'Kolasib', 'Saiha', 'Lawngtlai', 'Mamit', 'Saitual', 'Khawzawl'],
    'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung', 'Tuensang', 'Wokha', 'Zunheboto', 'Phek', 'Mon', 'Longleng', 'Kiphire'],
    'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Brahmapur', 'Sambalpur', 'Puri', 'Balasore', 'Bhadrak', 'Baripada', 'Jharsuguda'],
    'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Pathankot', 'Hoshiarpur', 'Batala', 'Moga'],
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Ajmer', 'Udaipur', 'Bhilwara', 'Alwar', 'Bharatpur', 'Sikar'],
    'Sikkim': ['Gangtok', 'Namchi', 'Gyalshing', 'Mangan', 'Rangpo', 'Jorethang', 'Singtam', 'Yuksom', 'Pelling', 'Ravangla'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Tiruppur', 'Vellore', 'Erode', 'Thoothukudi'],
    'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam', 'Mahbubnagar', 'Nalgonda', 'Adilabad', 'Suryapet', 'Siddipet'],
    'Tripura': ['Agartala', 'Udaipur', 'Dharmanagar', 'Kailashahar', 'Ambassa', 'Belonia', 'Khowai', 'Teliamura', 'Sabroom', 'Sonamura'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Varanasi', 'Meerut', 'Prayagraj', 'Bareilly', 'Aligarh', 'Moradabad'],
    'Uttarakhand': ['Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rudrapur', 'Kashipur', 'Rishikesh', 'Pithoragarh', 'Almora', 'Nainital'],
    'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Bardhaman', 'Malda', 'Baharampur', 'Habra', 'Kharagpur']
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'firstName':
      case 'middleName':
      case 'lastName':
        if (value && !/^[A-Za-z\s]+$/.test(value)) {
          newErrors[name] = 'Only alphabets and spaces allowed';
          return false;
        } else {
          delete newErrors[name];
        }
        break;
      
      case 'age':
        if (value && !/^\d+$/.test(value)) {
          newErrors[name] = 'Only numbers allowed';
          return false;
        } else if (value && (parseInt(value) < 18 || parseInt(value) > 65)) {
          newErrors[name] = 'Age must be between 18-65 years';
          return false;
        } else {
          delete newErrors[name];
        }
        break;

      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors[name] = 'Please enter a valid email address';
          return false;
        } else {
          delete newErrors[name];
        }
        break;

      case 'contactNo':
        if (value && !/^\d{10}$/.test(value)) {
          newErrors[name] = 'Contact number must be exactly 10 digits';
          return false;
        } else {
          delete newErrors[name];
        }
        break;

      case 'aadhaarNumber':
        if (value && !/^\d{12}$/.test(value)) {
          newErrors[name] = 'Aadhaar number must be exactly 12 digits';
          return false;
        } else {
          delete newErrors[name];
        }
        break;

      case 'pincode':
        if (value && !/^\d{6}$/.test(value)) {
          newErrors[name] = 'Pincode must be exactly 6 digits';
          return false;
        } else {
          delete newErrors[name];
        }
        break;

      case 'password':
        if (value && value.length < 8) {
          newErrors[name] = 'Password must be at least 8 characters';
          return false;
        } else if (value && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          newErrors[name] = 'Password must contain uppercase, lowercase, and number';
          return false;
        } else {
          delete newErrors[name];
        }
        break;

      case 'confirmPassword':
        if (value && value !== formData.password) {
          newErrors[name] = 'Passwords do not match';
          return false;
        } else {
          delete newErrors[name];
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Prevent invalid characters from being entered
    if (name === 'firstName' || name === 'middleName' || name === 'lastName') {
      if (value && !/^[A-Za-z\s]*$/.test(value)) {
        return;
      }
    }
    
    if (name === 'age' || name === 'contactNo' || name === 'aadhaarNumber' || name === 'pincode') {
      if (value && !/^\d*$/.test(value)) {
        return;
      }
    }

    // Handle state change - reset city
    if (name === 'state') {
      setFormData(prev => ({ ...prev, [name]: value, city: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    validateField(name, value);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
        setFormData(prev => ({ ...prev, photograph: file }));
        const newErrors = { ...errors };
        delete newErrors.photograph;
        setErrors(newErrors);
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
    const newErrors = {};

    fieldsToValidate.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
        isValid = false;
      } else {
        // Validate the field value
        const fieldValid = validateField(field, formData[field]);
        if (!fieldValid) {
          isValid = false;
        }
      }
    });

    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
      isValid = false;
    }

    // Special validation for disease details
    if (step === 4 && formData.majorDisease === 'yes' && !formData.diseaseDetails) {
      newErrors.diseaseDetails = 'Please provide disease details';
      isValid = false;
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
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
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                  placeholder="Enter middle name"
                />
                {errors.middleName && <p className="text-red-500 text-sm mt-1">{errors.middleName}</p>}
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
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
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
                  maxLength="2"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
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
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
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
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
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
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
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
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
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
                maxLength="10"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
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
                maxLength="12"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
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
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
                    errors.state ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select state</option>
                  {Object.keys(statesAndCities).map(state => (
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
                  disabled={!formData.state}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  } ${!formData.state ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                >
                  <option value="">Select city</option>
                  {formData.state && statesAndCities[formData.state].map(city => (
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
                maxLength="6"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
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
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
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
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
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
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
                    errors.diseaseDetails ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Please specify the disease details"
                />
                {errors.diseaseDetails && <p className="text-red-500 text-sm mt-1">{errors.diseaseDetails}</p>}
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
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent pr-12 text-black ${
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
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent pr-12 text-black ${
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

            <div>
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
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
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
              onClick={onBack}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step}
              </div>
              {step < 4 && (
                <div className={`w-12 h-1 ${currentStep > step ? 'bg-red-600' : 'bg-gray-200'}`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Form Steps */}
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-4xl mx-auto">
          {renderStep()}
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <button
                onClick={prevStep}
                className="px-6 py-3 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Back
              </button>
            )}
            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                className="ml-auto px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="ml-auto px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
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