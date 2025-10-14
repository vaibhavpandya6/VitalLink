import React, { useState, useRef } from 'react';
import { AlertTriangle, Calendar, LogOut, Droplet, Phone, X, Lock, Eye, EyeOff, CheckCircle, Settings, Users, MapPin, Building } from 'lucide-react';

const HospitalDashboard = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [showRaiseRequest, setShowRaiseRequest] = useState(false);
  const [showRequestConfirm, setShowRequestConfirm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const [emergencyRequest, setEmergencyRequest] = useState({
    emergencyType: '',
    bloodGroups: [],
    patientsCount: '',
    criticalityLevel: '',
    description: ''
  });

  const bookedSlotsRef = useRef(null);

  const hospital = {
    name: 'Apollo Hospital',
    email: 'emergency@apolloindore.com',
    phone: '+91 731-4567890',
    location: 'Vijay Nagar, Indore',
    address: 'Scheme 74C, Vijay Nagar, Indore, Madhya Pradesh 452010',
    licenseNo: 'MH-IND-2024-1234',
    memberSince: 'January 2023',
    emergencyContact: '+91 731-4567899'
  };

  const todayBookedSlots = [
    { id: 1, donorName: 'Rajesh Kumar', bloodGroup: 'O+', phone: '+91 9876543210', time: '10:00 AM', status: 'Confirmed' },
    { id: 2, donorName: 'Priya Sharma', bloodGroup: 'A+', phone: '+91 9876543211', time: '11:00 AM', status: 'Confirmed' },
    { id: 3, donorName: 'Amit Patel', bloodGroup: 'B+', phone: '+91 9876543212', time: '2:00 PM', status: 'Confirmed' },
    { id: 4, donorName: 'Sneha Verma', bloodGroup: 'O-', phone: '+91 9876543213', time: '3:00 PM', status: 'Pending' },
    { id: 5, donorName: 'Vikram Singh', bloodGroup: 'AB+', phone: '+91 9876543214', time: '4:00 PM', status: 'Confirmed' }
  ];

  const confirmedSlots = todayBookedSlots.filter(slot => slot.status === 'Confirmed');

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const emergencyTypes = [
    'Multiple Vehicle Accident',
    'Surgical Emergency',
    'Medical Emergency',
    'Trauma Case',
    'Obstetric Emergency',
    'Other'
  ];

  const handlePasswordChange = () => {
    if (passwordData.newPassword === passwordData.confirmPassword && passwordData.currentPassword) {
      alert('Password changed successfully!');
      setShowChangePassword(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      alert('Passwords do not match or current password is empty');
    }
  };

  const handleSignOut = () => {
    setShowSignOutConfirm(false);
    setShowSettings(false);
    alert('Signed out successfully!');
  };

  const closeDropdowns = () => {
    setShowProfile(false);
    setShowSettings(false);
  };

  const handleBloodGroupToggle = (bg) => {
    setEmergencyRequest(prev => ({
      ...prev,
      bloodGroups: prev.bloodGroups.includes(bg)
        ? prev.bloodGroups.filter(g => g !== bg)
        : [...prev.bloodGroups, bg]
    }));
  };

  const handleRaiseEmergency = () => {
    if (emergencyRequest.emergencyType && emergencyRequest.bloodGroups.length > 0 && 
        emergencyRequest.patientsCount && emergencyRequest.criticalityLevel) {
      setShowRequestConfirm(true);
      setTimeout(() => {
        setShowRequestConfirm(false);
        setShowRaiseRequest(false);
        setEmergencyRequest({
          emergencyType: '',
          bloodGroups: [],
          patientsCount: '',
          criticalityLevel: '',
          description: ''
        });
      }, 3000);
    } else {
      alert('Please fill all required fields');
    }
  };

  const getInitials = (name) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50" onClick={closeDropdowns}>
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg transform rotate-12">
                <div className="absolute inset-1 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-2 h-4 bg-red-600 rounded-full"></div>
                  <div className="w-1 h-6 bg-red-600 rounded-full ml-0.5"></div>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">VitalLink</h1>
                <p className="text-xs text-gray-500">Hospital Emergency Portal</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={(e) => { e.stopPropagation(); setShowSettings(!showSettings); setShowProfile(false); }}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <Settings className="w-6 h-6" />
                </button>

                {showSettings && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-2xl border z-50" onClick={(e) => e.stopPropagation()}>
                    <div className="p-4 border-b">
                      <h3 className="font-semibold text-gray-800">Settings</h3>
                    </div>
                    <div className="p-2 space-y-1">
                      <button
                        onClick={() => { setShowChangePassword(true); setShowSettings(false); }}
                        className="w-full flex items-center space-x-2 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Lock className="w-4 h-4" />
                        <span>Change Password</span>
                      </button>
                      <button
                        onClick={() => { setShowSignOutConfirm(true); }}
                        className="w-full flex items-center space-x-2 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={(e) => { e.stopPropagation(); setShowProfile(!showProfile); setShowSettings(false); }}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{getInitials(hospital.name)}</span>
                  </div>
                  <div className="text-left hidden md:block">
                    <p className="text-sm font-semibold text-gray-800">{hospital.name}</p>
                    <p className="text-xs text-gray-500">{hospital.location}</p>
                  </div>
                </button>

                {showProfile && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-2xl border z-50" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => { setShowProfilePage(true); setShowProfile(false); }}
                      className="w-full p-4 hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-lg font-bold">{getInitials(hospital.name)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 truncate">{hospital.name}</h3>
                          <p className="text-xs text-gray-500">View Profile</p>
                        </div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Emergency Management Dashboard</h2>
          </div>
          <button
            onClick={() => setShowRaiseRequest(true)}
            className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold shadow-lg"
          >
            <AlertTriangle className="w-5 h-5" />
            <span>Raise Emergency Request</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div 
            onClick={() => bookedSlotsRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white p-6 rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">{confirmedSlots.length}</h3>
            <p className="text-sm text-gray-600">Donor Responses</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 ref={bookedSlotsRef} className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            <span>Today's Booked Donation Slots</span>
          </h2>
          <div className="space-y-3">
            {confirmedSlots.map((slot) => (
              <div key={slot.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Droplet className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{slot.donorName}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-gray-600">{slot.phone}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm font-semibold text-red-600">{slot.bloodGroup}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{slot.time}</p>
                  <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                    {slot.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-600 via-black to-red-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Emergency Contact - VitalLink Headquarters</h3>
                  <p className="text-red-100 text-xs">Indore, Madhya Pradesh • Available 24/7</p>
                </div>
              </div>
              
              <a 
                href="tel:+919589517960" 
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-lg transition-colors border border-white/30"
              >
                <p className="text-xl font-bold">+91 9589517960</p>
                <p className="text-xs text-red-100">Tap to call</p>
              </a>
            </div>
          </div>
        </div>
      </div>

      {showProfilePage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={() => setShowProfilePage(false)}>
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full my-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-2xl font-bold text-gray-800">Hospital Profile</h3>
              <button
                onClick={() => setShowProfilePage(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6 pb-6 border-b">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-2xl font-bold">{getInitials(hospital.name)}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{hospital.name}</h2>
                  <p className="text-gray-600">{hospital.location}</p>
                  <p className="text-sm text-gray-500">Member since {hospital.memberSince}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Email</span>
                    <span className="font-semibold text-black">{hospital.email}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Phone</span>
                    <span className="font-semibold text-black">{hospital.phone}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Emergency Contact</span>
                    <span className="font-semibold text-black">{hospital.emergencyContact}</span>
                  </div>
                  <div className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Address</span>
                    <span className="font-semibold text-black text-right max-w-xs">{hospital.address}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">License No.</span>
                    <span className="font-semibold text-black">{hospital.licenseNo}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showChangePassword && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => { setShowChangePassword(false); setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' }); }}>
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold text-gray-800">Change Password</h3>
              <button
                onClick={() => { setShowChangePassword(false); setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' }); }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPwd ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full p-3 border rounded-lg pr-10 text-black"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPwd(!showCurrentPwd)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showCurrentPwd ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPwd ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full p-3 border rounded-lg pr-10 text-black"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPwd(!showNewPwd)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showNewPwd ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPwd ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full p-3 border rounded-lg pr-10 text-black"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showConfirmPwd ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
                  </button>
                </div>
              </div>

              <button
                onClick={handlePasswordChange}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}

      {showSignOutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Sign Out</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to sign out?</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowSignOutConfirm(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                No
              </button>
              <button
                onClick={handleSignOut}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {showRaiseRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full my-8">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <span>Raise Emergency Blood Request</span>
              </h3>
              <button
                onClick={() => { setShowRaiseRequest(false); setEmergencyRequest({ emergencyType: '', bloodGroups: [], patientsCount: '', criticalityLevel: '', description: '' }); }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Type *</label>
                <select
                  value={emergencyRequest.emergencyType}
                  onChange={(e) => setEmergencyRequest({ ...emergencyRequest, emergencyType: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 text-black"
                >
                  <option value="">Select emergency type</option>
                  {emergencyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blood Groups Required *</label>
                <div className="grid grid-cols-4 gap-2">
                  {bloodGroups.map(bg => (
                    <button
                      key={bg}
                      onClick={() => handleBloodGroupToggle(bg)}
                      className={`p-3 border rounded-lg transition-colors font-semibold ${
                        emergencyRequest.bloodGroups.includes(bg)
                          ? 'bg-red-600 text-white border-red-600'
                          : 'bg-white text-gray-700 hover:border-red-600'
                      }`}
                    >
                      {bg}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Patients *</label>
                  <input
                    type="number"
                    min="1"
                    value={emergencyRequest.patientsCount}
                    onChange={(e) => setEmergencyRequest({ ...emergencyRequest, patientsCount: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 text-black"
                    placeholder="Enter number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Criticality Level *</label>
                  <select
                    value={emergencyRequest.criticalityLevel}
                    onChange={(e) => setEmergencyRequest({ ...emergencyRequest, criticalityLevel: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 text-black"
                  >
                    <option value="">Select level</option>
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Moderate">Moderate</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Description (Optional)</label>
                <textarea
                  value={emergencyRequest.description}
                  onChange={(e) => setEmergencyRequest({ ...emergencyRequest, description: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 text-black"
                  rows="3"
                  placeholder="Provide any additional details about the emergency..."
                ></textarea>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> This will send emergency notifications to all eligible donors in your area matching the selected blood groups.
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => { setShowRaiseRequest(false); setEmergencyRequest({ emergencyType: '', bloodGroups: [], patientsCount: '', criticalityLevel: '', description: '' }); }}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold text-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRaiseEmergency}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold text-lg"
                >
                  Broadcast Emergency Alert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showRequestConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Emergency Alert Sent!</h3>
            <p className="text-gray-600 mb-4">
              Your emergency blood request has been successfully broadcast to all eligible donors in the area.
            </p>
            <div className="bg-blue-50 rounded-lg p-4 text-left">
              <p className="text-sm text-gray-700">
                <strong>Emergency Type:</strong> {emergencyRequest.emergencyType}
              </p>
              <p className="text-sm text-gray-700 mt-1">
                <strong>Blood Groups:</strong> {emergencyRequest.bloodGroups.join(', ')}
              </p>
              <p className="text-sm text-gray-700 mt-1">
                <strong>Patients:</strong> {emergencyRequest.patientsCount}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalDashboard;