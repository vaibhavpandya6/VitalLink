import React, { useState } from 'react';
import { Eye, EyeOff, Upload, CheckCircle, Building2, Mail, Phone, MapPin, Calendar, FileText, Camera, Shield, Clock, Users } from 'lucide-react';

const HospitalRegistrationForm = () => {
  const [formData, setFormData] = useState({
    hospitalName: '',
    hospitalType: '',
    registrationNumber: '',
    establishmentYear: '',
    officialEmail: '',
    primaryPhone: '',
    secondaryPhone: '',
    emergencyContact: '',
    website: '',
    state: '',
    city: '',
    pincode: '',
    address: '',
    totalBeds: '',
    icuBeds: '',
    bloodBankFacility: '',
    emergencyServices: '',
    specializations: [],
    administratorName: '',
    designation: '',
    adminContact: '',
    adminEmail: '',
    bloodBankLicense: '',
    storageCapacity: '',
    availableBloodGroups: [],
    operatingHours: '',
    hospitalLicense: null,
    bloodBankLicenseFile: null,
    registrationCertificate: null,
    hospitalPhoto: null,
    password: '',
    confirmPassword: '',
    nabhAccreditation: '',
    nabhCertNumber: '',
    isoAccreditation: '',
    isoCertNumber: '',
    termsAccepted: false,
    privacyAccepted: false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [showReview, setShowReview] = useState(false);

  const hospitalTypes = ['Government', 'Private', 'Semi-Government', 'Trust', 'NGO'];
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const specializations = [
    'Cardiology', 'Orthopedics', 'Neurology', 'Oncology', 'Pediatrics', 'Gynecology',
    'Emergency Medicine', 'Radiology', 'Pathology', 'Anesthesiology', 'Surgery', 'Dermatology'
  ];

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
    'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
    'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const citiesByState = {
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Tirupati', 'Kakinada', 'Rajahmundry'],
    'Arunachal Pradesh': ['Itanagar', 'Naharlagun', 'Pasighat', 'Tawang'],
    'Assam': ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon', 'Tinsukia'],
    'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Purnia', 'Bihar Sharif'],
    'Chhattisgarh': ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg', 'Rajnandgaon'],
    'Delhi': ['New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi', 'Central Delhi'],
    'Goa': ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar', 'Junagadh'],
    'Haryana': ['Faridabad', 'Gurgaon', 'Panipat', 'Ambala', 'Yamunanagar', 'Rohtak', 'Hisar', 'Karnal'],
    'Himachal Pradesh': ['Shimla', 'Dharamshala', 'Solan', 'Mandi', 'Kullu', 'Manali'],
    'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Hazaribagh'],
    'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum', 'Davangere', 'Bellary'],
    'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Palakkad', 'Kannur'],
    'Madhya Pradesh': ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas', 'Ratlam'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Solapur', 'Kolhapur'],
    'Manipur': ['Imphal', 'Thoubal', 'Churachandpur'],
    'Meghalaya': ['Shillong', 'Tura', 'Jowai'],
    'Mizoram': ['Aizawl', 'Lunglei', 'Champhai'],
    'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung'],
    'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Puri', 'Berhampur', 'Sambalpur'],
    'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Chandigarh'],
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Udaipur', 'Ajmer', 'Alwar'],
    'Sikkim': ['Gangtok', 'Namchi', 'Gyalshing', 'Mangan'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Vellore'],
    'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar'],
    'Tripura': ['Agartala', 'Udaipur', 'Dharmanagar'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Meerut', 'Varanasi', 'Allahabad', 'Bareilly'],
    'Uttarakhand': ['Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rudrapur'],
    'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Darjeeling']
  };

  const generateUniqueId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `HSP-${(timestamp + random).toUpperCase()}`;
  };

  const handleNumericInput = (e, maxLength) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^\d]/g, '');
    const limitedValue = numericValue.slice(0, maxLength);
    return limitedValue;
  };

  const handleAlphabeticInput = (e) => {
    const value = e.target.value;
    const alphabeticValue = value.replace(/[^A-Za-z\s]/g, '');
    return alphabeticValue;
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'hospitalName':
      case 'administratorName':
      case 'designation':
        if (value === '') {
          delete newErrors[name];
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          newErrors[name] = 'Only alphabets and spaces allowed';
        } else if (value.trim().length < 2) {
          newErrors[name] = 'Must be at least 2 characters';
        } else {
          delete newErrors[name];
        }
        break;

      case 'registrationNumber':
        if (value === '') {
          delete newErrors[name];
        } else if (!/^\d+$/.test(value)) {
          newErrors[name] = 'Only numbers allowed';
        } else if (value.length !== 10) {
          newErrors[name] = 'Must be exactly 10 digits';
        } else {
          delete newErrors[name];
        }
        break;

      case 'establishmentYear':
        const currentYear = new Date().getFullYear();
        if (value === '') {
          delete newErrors[name];
        } else if (!/^\d+$/.test(value)) {
          newErrors[name] = 'Only numbers allowed';
        } else if (value.length !== 4) {
          newErrors[name] = 'Must be exactly 4 digits';
        } else if (parseInt(value) > currentYear || parseInt(value) < 1800) {
          newErrors[name] = `Year must be between 1800-${currentYear}`;
        } else {
          delete newErrors[name];
        }
        break;

      case 'officialEmail':
      case 'adminEmail':
        if (value === '') {
          delete newErrors[name];
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors[name] = 'Invalid email format';
        } else {
          delete newErrors[name];
        }
        break;

      case 'primaryPhone':
      case 'secondaryPhone':
      case 'emergencyContact':
      case 'adminContact':
        if (value === '') {
          if (name === 'secondaryPhone') {
            delete newErrors[name];
          } else {
            delete newErrors[name];
          }
        } else if (!/^\d+$/.test(value)) {
          newErrors[name] = 'Only numbers allowed';
        } else if (value.length !== 10) {
          newErrors[name] = 'Must be exactly 10 digits';
        } else {
          delete newErrors[name];
        }
        break;

      case 'pincode':
        if (value === '') {
          delete newErrors[name];
        } else if (!/^\d+$/.test(value)) {
          newErrors[name] = 'Only numbers allowed';
        } else if (value.length !== 6) {
          newErrors[name] = 'Must be exactly 6 digits';
        } else {
          delete newErrors[name];
        }
        break;

      case 'totalBeds':
      case 'icuBeds':
      case 'storageCapacity':
        if (value === '') {
          delete newErrors[name];
        } else if (!/^\d+$/.test(value)) {
          newErrors[name] = 'Only numbers allowed';
        } else if (parseInt(value) <= 0) {
          newErrors[name] = 'Must be greater than 0';
        } else {
          delete newErrors[name];
        }
        break;

      case 'password':
        if (value === '') {
          delete newErrors[name];
        } else if (value.length < 8) {
          newErrors[name] = 'Must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          newErrors[name] = 'Must contain uppercase, lowercase, and number';
        } else {
          delete newErrors[name];
        }
        break;

      case 'confirmPassword':
        if (value === '') {
          delete newErrors[name];
        } else if (value !== formData.password) {
          newErrors[name] = 'Passwords do not match';
        } else {
          delete newErrors[name];
        }
        break;

      case 'address':
        if (value === '') {
          delete newErrors[name];
        } else if (value.trim().length < 10) {
          newErrors[name] = 'Address must be at least 10 characters';
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
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'specializations' || name === 'availableBloodGroups') {
        const currentArray = formData[name];
        const newArray = checked 
          ? [...currentArray, value]
          : currentArray.filter(item => item !== value);
        setFormData(prev => ({ ...prev, [name]: newArray }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else {
      if (name === 'state') {
        setFormData(prev => ({ ...prev, [name]: value, city: '' }));
      } else {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
      validateField(name, value);
    }
  };

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = fieldName === 'hospitalPhoto' 
        ? ['image/jpeg', 'image/jpg'] 
        : ['application/pdf', 'image/jpeg', 'image/jpg'];
      
      if (allowedTypes.includes(file.type)) {
        setFormData(prev => ({ ...prev, [fieldName]: file }));
        const newErrors = { ...errors };
        delete newErrors[fieldName];
        setErrors(newErrors);
      } else {
        setErrors(prev => ({ 
          ...prev, 
          [fieldName]: fieldName === 'hospitalPhoto' 
            ? 'Only JPG/JPEG files allowed' 
            : 'Only PDF/JPG/JPEG files allowed'
        }));
      }
    }
  };

  const validateStep = (step) => {
    const stepFields = {
      1: ['hospitalName', 'hospitalType', 'registrationNumber', 'establishmentYear'],
      2: ['officialEmail', 'primaryPhone', 'emergencyContact'],
      3: ['state', 'city', 'pincode', 'address'],
      4: ['totalBeds', 'icuBeds', 'bloodBankFacility', 'emergencyServices'],
      5: ['administratorName', 'designation', 'adminContact', 'adminEmail'],
      6: ['hospitalLicense', 'registrationCertificate', 'password', 'confirmPassword', 'termsAccepted', 'privacyAccepted']
    };

    const fieldsToValidate = stepFields[step];
    let isValid = true;
    const newErrors = {};

    const stepFieldsSet = new Set(fieldsToValidate);
    const hasStepErrors = Object.keys(errors).some(errorKey => stepFieldsSet.has(errorKey));
    if (hasStepErrors) {
      return false;
    }

    fieldsToValidate.forEach(field => {
      const value = formData[field];
      
      if (!value || (typeof value === 'string' && value.trim() === '') || 
          (typeof value === 'boolean' && !value) ||
          (value === null)) {
        newErrors[field] = 'This field is required';
        isValid = false;
        return;
      }

      switch (field) {
        case 'hospitalName':
        case 'administratorName':
        case 'designation':
          if (!/^[A-Za-z\s]+$/.test(value) || value.trim().length < 2) {
            newErrors[field] = 'Invalid input';
            isValid = false;
          }
          break;

        case 'registrationNumber':
          if (!/^\d{10}$/.test(value)) {
            newErrors[field] = 'Must be exactly 10 digits';
            isValid = false;
          }
          break;

        case 'establishmentYear':
          const currentYear = new Date().getFullYear();
          if (!/^\d{4}$/.test(value) || parseInt(value) > currentYear || parseInt(value) < 1800) {
            newErrors[field] = 'Invalid year';
            isValid = false;
          }
          break;

        case 'officialEmail':
        case 'adminEmail':
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            newErrors[field] = 'Invalid email';
            isValid = false;
          }
          break;

        case 'primaryPhone':
        case 'emergencyContact':
        case 'adminContact':
          if (!/^\d{10}$/.test(value)) {
            newErrors[field] = 'Must be exactly 10 digits';
            isValid = false;
          }
          break;

        case 'pincode':
          if (!/^\d{6}$/.test(value)) {
            newErrors[field] = 'Must be exactly 6 digits';
            isValid = false;
          }
          break;

        case 'address':
          if (value.trim().length < 10) {
            newErrors[field] = 'Address too short';
            isValid = false;
          }
          break;

        case 'totalBeds':
        case 'icuBeds':
          if (!/^\d+$/.test(value) || parseInt(value) <= 0) {
            newErrors[field] = 'Invalid number';
            isValid = false;
          }
          break;

        case 'password':
          if (value.length < 8 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
            newErrors[field] = 'Invalid password format';
            isValid = false;
          }
          break;

        case 'confirmPassword':
          if (value !== formData.password) {
            newErrors[field] = 'Passwords do not match';
            isValid = false;
          }
          break;
      }
    });

    if (step === 4 && formData.bloodBankFacility === 'yes') {
      if (!formData.storageCapacity || !/^\d+$/.test(formData.storageCapacity) || parseInt(formData.storageCapacity) <= 0) {
        newErrors.storageCapacity = 'Valid storage capacity required';
        isValid = false;
      }
      if (formData.availableBloodGroups.length === 0) {
        newErrors.availableBloodGroups = 'Select at least one blood group';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    setShowReview(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    if (validateStep(6)) {
      const uniqueId = generateUniqueId();
      setReferenceId(uniqueId);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReview = () => {
    setShowReview(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-12 h-12 text-yellow-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Registration Submitted!</h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-yellow-800 mb-2">⏳ Verification Status: PENDING</h3>
            <p className="text-yellow-700 text-sm">
              Your hospital registration is currently under verification by our team. 
              This process typically takes 2-5 business days.
            </p>
          </div>
          <p className="text-gray-600 mb-6">
            You will receive an email notification once your hospital account is verified and approved. 
            After approval, you can sign in and start using VitalLink services.
          </p>
          <div className="space-y-3">
            <div className="text-sm text-gray-500">
              <strong>Reference ID:</strong> {referenceId}
            </div>
          </div>
          
          <button
            onClick={() => window.location.href = '/'}
            className="mt-6 px-8 py-3 bg-gradient-to-r from-red-600 to-black text-white rounded-lg hover:from-red-700 hover:to-gray-900 transition-all font-semibold w-full shadow-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (showReview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg transform rotate-12">
                <div className="absolute inset-1 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-2 h-4 bg-red-600 rounded-full"></div>
                  <div className="w-1 h-6 bg-red-600 rounded-full ml-0.5"></div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">VitalLink</h1>
                <p className="text-sm text-gray-600">Application Review</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Registration Summary</h2>
            
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800">Manual Verification Required</h4>
                    <p className="text-yellow-700 text-sm mt-1">
                      Your hospital registration will be subject to manual verification by our team. 
                      The verification process typically takes 2-5 business days. You will receive email 
                      notifications about the status updates.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Building2 className="w-5 h-5 mr-2 text-red-600" />
                  Hospital Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-black">
                  <div><span className="font-medium">Hospital Name:</span> {formData.hospitalName}</div>
                  <div><span className="font-medium">Type:</span> {formData.hospitalType}</div>
                  <div><span className="font-medium">Registration Number:</span> {formData.registrationNumber}</div>
                  <div><span className="font-medium">Establishment Year:</span> {formData.establishmentYear}</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-red-600" />
                  Contact Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-black">
                  <div><span className="font-medium">Email:</span> {formData.officialEmail}</div>
                  <div><span className="font-medium">Primary Phone:</span> {formData.primaryPhone}</div>
                  <div><span className="font-medium">Secondary Phone:</span> {formData.secondaryPhone || 'N/A'}</div>
                  <div><span className="font-medium">Emergency Contact:</span> {formData.emergencyContact}</div>
                  <div><span className="font-medium">Website:</span> {formData.website || 'N/A'}</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-red-600" />
                  Address Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-black">
                  <div className="md:col-span-2"><span className="font-medium">Address:</span> {formData.address}</div>
                  <div><span className="font-medium">State:</span> {formData.state}</div>
                  <div><span className="font-medium">City:</span> {formData.city}</div>
                  <div><span className="font-medium">Pincode:</span> {formData.pincode}</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-red-600" />
                  Medical Infrastructure
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-black">
                  <div><span className="font-medium">Total Beds:</span> {formData.totalBeds}</div>
                  <div><span className="font-medium">ICU Beds:</span> {formData.icuBeds}</div>
                  <div><span className="font-medium">Blood Bank:</span> {formData.bloodBankFacility === 'yes' ? 'Yes' : 'No'}</div>
                  <div><span className="font-medium">Emergency Services:</span> {formData.emergencyServices === 'yes' ? 'Yes' : 'No'}</div>
                  {formData.bloodBankFacility === 'yes' && (
                    <>
                      <div><span className="font-medium">Storage Capacity:</span> {formData.storageCapacity} units</div>
                      <div className="md:col-span-2"><span className="font-medium">Blood Groups:</span> {formData.availableBloodGroups.join(', ')}</div>
                    </>
                  )}
                  {formData.specializations.length > 0 && (
                    <div className="md:col-span-2"><span className="font-medium">Specializations:</span> {formData.specializations.join(', ')}</div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-red-600" />
                  Administrative Contact
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-black">
                  <div><span className="font-medium">Administrator:</span> {formData.administratorName}</div>
                  <div><span className="font-medium">Designation:</span> {formData.designation}</div>
                  <div><span className="font-medium">Contact:</span> {formData.adminContact}</div>
                  <div><span className="font-medium">Email:</span> {formData.adminEmail}</div>
                  {formData.nabhAccreditation === 'yes' && (
                    <div><span className="font-medium">NABH Cert:</span> {formData.nabhCertNumber}</div>
                  )}
                  {formData.isoAccreditation === 'yes' && (
                    <div><span className="font-medium">ISO Cert:</span> {formData.isoCertNumber}</div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-red-600" />
                  Documents
                </h3>
                <div className="space-y-2 text-sm text-black">
                  <div className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" /> Hospital License: {formData.hospitalLicense?.name}</div>
                  <div className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" /> Registration Certificate: {formData.registrationCertificate?.name}</div>
                  {formData.bloodBankLicenseFile && (
                    <div className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" /> Blood Bank License: {formData.bloodBankLicenseFile?.name}</div>
                  )}
                  {formData.hospitalPhoto && (
                    <div className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" /> Hospital Photo: {formData.hospitalPhoto?.name}</div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    className="mt-1 rounded border-gray-300 text-black focus:ring-black"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to VitalLink's Terms of Service and confirm that all provided information is accurate and complete. *
                  </span>
                </label>
                {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted}</p>}

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="privacyAccepted"
                    checked={formData.privacyAccepted}
                    onChange={handleInputChange}
                    className="mt-1 rounded border-gray-300 text-black focus:ring-black"
                  />
                  <span className="text-sm text-gray-600">
                    I acknowledge and accept VitalLink's Privacy Policy regarding the handling of hospital and patient data. *
                  </span>
                </label>
                {errors.privacyAccepted && <p className="text-red-500 text-sm">{errors.privacyAccepted}</p>}
              </div>
            </div>

            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowReview(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Back to Edit
              </button>
              
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
              >
                Submit for Verification
              </button>
            </div>
          </div>
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
              <Building2 className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800">Hospital Information</h3>
              <p className="text-gray-600">Basic details about your hospital</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hospital Name *
                </label>
                <input
                  type="text"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={(e) => {
                    const alphabeticValue = handleAlphabeticInput(e);
                    handleInputChange({ target: { name: 'hospitalName', value: alphabeticValue } });
                  }}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
                    errors.hospitalName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter hospital name"
                />
                {errors.hospitalName && <p className="text-red-500 text-sm mt-1">{errors.hospitalName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hospital Type *
                </label>
                <select
                  name="hospitalType"
                  value={formData.hospitalType}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
                    errors.hospitalType ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select type</option>
                  {hospitalTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.hospitalType && <p className="text-red-500 text-sm mt-1">{errors.hospitalType}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Number *
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={(e) => {
                    const numericValue = handleNumericInput(e, 10);
                    handleInputChange({ target: { name: 'registrationNumber', value: numericValue } });
                  }}
                  maxLength="10"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
                    errors.registrationNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="10-digit registration number"
                />
                {errors.registrationNumber && <p className="text-red-500 text-sm mt-1">{errors.registrationNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Establishment Year *
                </label>
                <input
                  type="text"
                  name="establishmentYear"
                  value={formData.establishmentYear}
                  onChange={(e) => {
                    const numericValue = handleNumericInput(e, 4);
                    handleInputChange({ target: { name: 'establishmentYear', value: numericValue } });
                  }}
                  maxLength="4"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
                    errors.establishmentYear ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 1995"
                />
                {errors.establishmentYear && <p className="text-red-500 text-sm mt-1">{errors.establishmentYear}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Phone className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800">Contact Information</h3>
              <p className="text-gray-600">How can we reach your hospital?</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Official Email Address *
              </label>
              <input
                type="email"
                name="officialEmail"
                value={formData.officialEmail}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
                  errors.officialEmail ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="hospital@example.com"
              />
              {errors.officialEmail && <p className="text-red-500 text-sm mt-1">{errors.officialEmail}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Phone Number *
                </label>
                <input
                  type="text"
                  name="primaryPhone"
                  value={formData.primaryPhone}
                  onChange={(e) => {
                    const numericValue = handleNumericInput(e, 10);
                    handleInputChange({ target: { name: 'primaryPhone', value: numericValue } });
                  }}
                  maxLength="10"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
                    errors.primaryPhone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="10-digit number"
                />
                {errors.primaryPhone && <p className="text-red-500 text-sm mt-1">{errors.primaryPhone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Phone Number
                </label>
                <input
                  type="text"
                  name="secondaryPhone"
                  value={formData.secondaryPhone}
                  onChange={(e) => {
                    const numericValue = handleNumericInput(e, 10);
                    handleInputChange({ target: { name: 'secondaryPhone', value: numericValue } });
                  }}
                  maxLength="10"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                  placeholder="10-digit number (optional)"
                />
                {errors.secondaryPhone && <p className="text-red-500 text-sm mt-1">{errors.secondaryPhone}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Contact (24/7) *
                </label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => {
                    const numericValue = handleNumericInput(e, 10);
                    handleInputChange({ target: { name: 'emergencyContact', value: numericValue } });
                  }}
                  maxLength="10"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
                    errors.emergencyContact ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Emergency helpline number"
                />
                {errors.emergencyContact && <p className="text-red-500 text-sm mt-1">{errors.emergencyContact}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                  placeholder="https://hospital.com (optional)"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <MapPin className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800">Address Information</h3>
              <p className="text-gray-600">Where is your hospital located?</p>
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
                  disabled={!formData.state}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  } ${!formData.state ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                >
                  <option value="">Select city</option>
                  {formData.state && citiesByState[formData.state]?.map(city => (
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
                onChange={(e) => {
                  const numericValue = handleNumericInput(e, 6);
                  handleInputChange({ target: { name: 'pincode', value: numericValue } });
                }}
                maxLength="6"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
                  errors.pincode ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="6-digit pincode"
              />
              {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Complete Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter complete hospital address"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Users className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800">Medical Infrastructure</h3>
              <p className="text-gray-600">Details about hospital capacity and services</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Bed Capacity *
                </label>
                <input
                  type="text"
                  name="totalBeds"
                  value={formData.totalBeds}
                  onChange={(e) => {
                    const numericValue = handleNumericInput(e, 10);
                    handleInputChange({ target: { name: 'totalBeds', value: numericValue } });
                  }}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
                    errors.totalBeds ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Number of beds"
                />
                {errors.totalBeds && <p className="text-red-500 text-sm mt-1">{errors.totalBeds}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ICU Beds *
                </label>
                <input
                  type="text"
                  name="icuBeds"
                  value={formData.icuBeds}
                  onChange={(e) => {
                    const numericValue = handleNumericInput(e, 10);
                    handleInputChange({ target: { name: 'icuBeds', value: numericValue } });
                  }}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
                    errors.icuBeds ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Number of ICU beds"
                />
                {errors.icuBeds && <p className="text-red-500 text-sm mt-1">{errors.icuBeds}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Bank Facility *
                </label>
                <select
                  name="bloodBankFacility"
                  value={formData.bloodBankFacility}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
                    errors.bloodBankFacility ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.bloodBankFacility && <p className="text-red-500 text-sm mt-1">{errors.bloodBankFacility}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  24/7 Emergency Services *
                </label>
                <select
                  name="emergencyServices"
                  value={formData.emergencyServices}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
                    errors.emergencyServices ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.emergencyServices && <p className="text-red-500 text-sm mt-1">{errors.emergencyServices}</p>}
              </div>
            </div>

            {formData.bloodBankFacility === 'yes' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-4">
                <h4 className="font-semibold text-red-800">Blood Bank Details</h4>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Storage Capacity (units) *
                    </label>
                    <input
                      type="text"
                      name="storageCapacity"
                      value={formData.storageCapacity}
                      onChange={(e) => {
                        const numericValue = handleNumericInput(e, 10);
                        handleInputChange({ target: { name: 'storageCapacity', value: numericValue } });
                      }}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
                        errors.storageCapacity ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Blood storage capacity"
                    />
                    {errors.storageCapacity && <p className="text-red-500 text-sm mt-1">{errors.storageCapacity}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Blood Bank License Number
                    </label>
                    <input
                      type="text"
                      name="bloodBankLicense"
                      value={formData.bloodBankLicense}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                      placeholder="License number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Blood Groups *
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {bloodGroups.map(group => (
                      <label key={group} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="availableBloodGroups"
                          value={group}
                          checked={formData.availableBloodGroups.includes(group)}
                          onChange={handleInputChange}
                          className="rounded border-gray-300 text-black focus:ring-black"
                        />
                        <span className="text-sm text-black">{group}</span>
                      </label>
                    ))}
                  </div>
                  {errors.availableBloodGroups && <p className="text-red-500 text-sm mt-1">{errors.availableBloodGroups}</p>}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specializations
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {specializations.map(spec => (
                  <label key={spec} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="specializations"
                      value={spec}
                      checked={formData.specializations.includes(spec)}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-black focus:ring-black"
                    />
                    <span className="text-sm text-black">{spec}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Shield className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800">Administrative Contact</h3>
              <p className="text-gray-600">Primary contact person for hospital</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Administrator/Director Name *
                </label>
                <input
                  type="text"
                  name="administratorName"
                  value={formData.administratorName}
                  onChange={(e) => {
                    const alphabeticValue = handleAlphabeticInput(e);
                    handleInputChange({ target: { name: 'administratorName', value: alphabeticValue } });
                  }}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
                    errors.administratorName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Full name"
                />
                {errors.administratorName && <p className="text-red-500 text-sm mt-1">{errors.administratorName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Designation *
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={(e) => {
                    const alphabeticValue = handleAlphabeticInput(e);
                    handleInputChange({ target: { name: 'designation', value: alphabeticValue } });
                  }}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
                    errors.designation ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Chief Medical Officer"
                />
                {errors.designation && <p className="text-red-500 text-sm mt-1">{errors.designation}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number *
                </label>
                <input
                  type="text"
                  name="adminContact"
                  value={formData.adminContact}
                  onChange={(e) => {
                    const numericValue = handleNumericInput(e, 10);
                    handleInputChange({ target: { name: 'adminContact', value: numericValue } });
                  }}
                  maxLength="10"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
                    errors.adminContact ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="10-digit number"
                />
                {errors.adminContact && <p className="text-red-500 text-sm mt-1">{errors.adminContact}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="adminEmail"
                  value={formData.adminEmail}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black ${
                    errors.adminEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="admin@hospital.com"
                />
                {errors.adminEmail && <p className="text-red-500 text-sm mt-1">{errors.adminEmail}</p>}
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
              <h4 className="font-semibold text-gray-800">Accreditations</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NABH Accreditation
                  </label>
                  <select
                    name="nabhAccreditation"
                    value={formData.nabhAccreditation}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                  >
                    <option value="">Select option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                {formData.nabhAccreditation === 'yes' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NABH Certificate Number
                    </label>
                    <input
                      type="text"
                      name="nabhCertNumber"
                      value={formData.nabhCertNumber}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                      placeholder="Certificate number"
                    />
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ISO Certification
                  </label>
                  <select
                    name="isoAccreditation"
                    value={formData.isoAccreditation}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                  >
                    <option value="">Select option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                {formData.isoAccreditation === 'yes' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ISO Certificate Number
                    </label>
                    <input
                      type="text"
                      name="isoCertNumber"
                      value={formData.isoCertNumber}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                      placeholder="Certificate number"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <FileText className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800">Documents & Security</h3>
              <p className="text-gray-600">Upload required documents and set password</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hospital License Certificate *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-red-500 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg"
                    onChange={(e) => handleFileUpload(e, 'hospitalLicense')}
                    className="hidden"
                    id="hospitalLicense"
                  />
                  <label htmlFor="hospitalLicense" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">
                      {formData.hospitalLicense ? formData.hospitalLicense.name : 'Click to upload license'}
                    </p>
                    <p className="text-xs text-gray-500">PDF, JPG, or JPEG</p>
                  </label>
                </div>
                {errors.hospitalLicense && <p className="text-red-500 text-sm mt-1">{errors.hospitalLicense}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Certificate *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-red-500 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg"
                    onChange={(e) => handleFileUpload(e, 'registrationCertificate')}
                    className="hidden"
                    id="registrationCertificate"
                  />
                  <label htmlFor="registrationCertificate" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">
                      {formData.registrationCertificate ? formData.registrationCertificate.name : 'Click to upload certificate'}
                    </p>
                    <p className="text-xs text-gray-500">PDF, JPG, or JPEG</p>
                  </label>
                </div>
                {errors.registrationCertificate && <p className="text-red-500 text-sm mt-1">{errors.registrationCertificate}</p>}
              </div>

              {formData.bloodBankFacility === 'yes' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blood Bank License
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-red-500 transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg"
                      onChange={(e) => handleFileUpload(e, 'bloodBankLicenseFile')}
                      className="hidden"
                      id="bloodBankLicenseFile"
                    />
                    <label htmlFor="bloodBankLicenseFile" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">
                        {formData.bloodBankLicenseFile ? formData.bloodBankLicenseFile.name : 'Click to upload blood bank license'}
                      </p>
                      <p className="text-xs text-gray-500">PDF, JPG, or JPEG</p>
                    </label>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hospital Photo
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-red-500 transition-colors">
                  <input
                    type="file"
                    accept=".jpg,.jpeg"
                    onChange={(e) => handleFileUpload(e, 'hospitalPhoto')}
                    className="hidden"
                    id="hospitalPhoto"
                  />
                  <label htmlFor="hospitalPhoto" className="cursor-pointer">
                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">
                      {formData.hospitalPhoto ? formData.hospitalPhoto.name : 'Click to upload hospital photo'}
                    </p>
                    <p className="text-xs text-gray-500">JPG or JPEG only</p>
                  </label>
                </div>
                {errors.hospitalPhoto && <p className="text-red-500 text-sm mt-1">{errors.hospitalPhoto}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
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
                    placeholder="Create strong password"
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
                    placeholder="Confirm password"
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
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-800">Manual Verification Required</h4>
                  <p className="text-yellow-700 text-sm mt-1">
                    Your hospital registration will be subject to manual verification by our team. 
                    The verification process typically takes 2-5 business days. You will receive email 
                    notifications about the status updates.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  className="mt-1 rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="text-sm text-gray-600">
                  I agree to VitalLink's Terms of Service and confirm that all provided information is accurate and complete. *
                </span>
              </label>
              {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted}</p>}

              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="privacyAccepted"
                  checked={formData.privacyAccepted}
                  onChange={handleInputChange}
                  className="mt-1 rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="text-sm text-gray-600">
                  I acknowledge and accept VitalLink's Privacy Policy regarding the handling of hospital and patient data. *
                </span>
              </label>
              {errors.privacyAccepted && <p className="text-red-500 text-sm">{errors.privacyAccepted}</p>}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white w-screen">
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
                <p className="text-sm text-gray-600">Hospital Registration</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3, 4, 5, 6].map((step) => (
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
              {step < 6 && (
                <div
                  className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-red-600' : 'bg-gray-200'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-6xl mx-auto">
          {renderStep()}

          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            {currentStep > 1 && (
              <button
                onClick={prevStep}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Previous
              </button>
            )}
            
            <div className="ml-auto">
              {currentStep < 6 ? (
                <button
                  onClick={nextStep}
                  className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
                >
                  Next Step
                </button>
              ) : (
                <div className="space-x-4">
                  <button
                    onClick={handleReview}
                    className="px-6 py-3 border border-black text-black rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Review
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
                  >
                    Submit for Verification
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalRegistrationForm;