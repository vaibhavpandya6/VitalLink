import React, { useState, useRef } from 'react';
import { AlertTriangle, Calendar, Award, User, Bell, LogOut, Clock, MapPin, Droplet, Heart, Shield, TrendingUp, ChevronRight, X, Lock, Eye, EyeOff, CheckCircle, Settings, FileText } from 'lucide-react';

const DonorDashboard = ({ userData, onSignOut }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [showSlotConfirmation, setShowSlotConfirmation] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const donationHistoryRef = useRef(null);
  const impactRef = useRef(null);
  const badgesRef = useRef(null);

  const user = userData || {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    bloodGroup: 'O+',
    contactNo: '+91 9876543210',
    city: 'Indore, Madhya Pradesh',
   // lastDonation: '2024-08-15',
    nextEligible: '2024-10-15',
    totalDonations: 12,
    livesImpacted: 36,
    //badges: ['Life Saver', 'Hero', 'Regular Donor'],
    memberSince: 'March 2024',
    profilePhoto: null
  };
  console.log("User Data from props:", user);

  const activeEmergency = {
    title: 'URGENT: Multiple Vehicle Accident',
    city: 'Vijay Nagar, Indore',
    bloodNeeded: ['O+', 'O-', 'A+', 'B+'],
    criticality: 'CRITICAL',
    patientsAffected: 8,
    time: '25 mins ago'
  };

  const nearbyHospitals = [
    { id: 1, name: 'Apollo Hospital', address: 'Vijay Nagar', slots: ['10:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'] },
    { id: 2, name: 'CHL Hospital', address: 'AB Road', slots: ['10:30 AM', '12:00 PM', '3:00 PM', '5:00 PM'] },
    { id: 3, name: 'Bombay Hospital', address: 'Ring Road', slots: ['9:00 AM', '11:30 AM', '2:30 PM', '4:30 PM'] },
    { id: 4, name: 'Medanta Hospital', address: 'Scheme 74', slots: ['9:30 AM', '11:00 AM', '1:00 PM', '3:30 PM'] },
    { id: 5, name: 'Shalby Hospital', address: 'Janjeerwala Square', slots: ['10:00 AM', '12:30 PM', '2:00 PM', '5:00 PM'] }
  ];

  const donationHistory = [
    { date: '2024-08-15', hospital: 'Apollo Hospital', bloodGroup: 'O+', status: 'Completed' },
    { date: '2024-06-10', hospital: 'CHL Hospital', bloodGroup: 'O+', status: 'Completed' },
    { date: '2024-04-05', hospital: 'Bombay Hospital', bloodGroup: 'O+', status: 'Completed' }
  ];

  const notifications = [
    { id: 1, title: 'Emergency Alert', message: 'Critical blood need in Vijay Nagar area', time: '25 mins ago', type: 'emergency' },
    { id: 2, title: 'Slot Confirmed', message: 'Your donation slot at Apollo Hospital confirmed', time: '2 hours ago', type: 'success' },
    { id: 3, title: 'Reminder', message: 'You are eligible to donate blood again!', time: '1 day ago', type: 'info' }
  ];

  const handleSlotBooking = () => {
    if (selectedHospital && selectedSlot) {
      setShowSlotConfirmation(true);
      setTimeout(() => {
        setShowSlotConfirmation(false);
        setSelectedHospital('');
        setSelectedSlot('');
      }, 3000);
    }
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword === passwordData.confirmPassword && passwordData.currentPassword) {
      alert('Password changed successfully!');
      setShowChangePassword(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      alert('Passwords do not match or current password is empty');
    }
  };

  // const calculateDaysUntilEligible = () => {
  //   const today = new Date();
  //   const eligible = new Date(user.nextEligible);
  //   const diffTime = eligible - today;
  //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //   return diffDays > 0 ? diffDays : 0;
  // };

  // const isEligibleNow = calculateDaysUntilEligible() === 0;

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // const getInitials = (name) => {
  //   const names = name.split(' ');
  //   if (names.length >= 2) {
  //     return names[0][0] + names[names.length - 1][0];
  //   }
  //   return name[0];
  // };
  const getInitials = (name) => {
  if (!name || typeof name !== 'string') return '?'; // fallback
  const names = name.trim().split(' ');
  if (names.length >= 2) {
    return names[0][0] + names[names.length - 1][0];
  }
  return names[0][0];
};


  const handleSignOut = () => {
    setShowSignOutConfirm(false);
    setShowSettings(false);
    onSignOut();
  };

  const closeDropdowns = () => {
    setShowNotifications(false);
    setShowProfile(false);
    setShowSettings(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 w-screen" onClick={closeDropdowns}>
      {/* Top Navigation */}
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
                <p className="text-xs text-gray-500">Emergency Blood Donation</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowNotifications(!showNotifications);
                    setShowProfile(false);
                    setShowSettings(false);
                  }}
                  className="relative p-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <Bell className="w-6 h-6" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
                </button>

                {showNotifications && (
                  <div
                    className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-2xl border z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-4 border-b">
                      <h3 className="font-semibold text-gray-800">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                            notif.type === 'emergency' ? 'bg-red-50' : ''
                          }`}
                        >
                          <h4 className="font-semibold text-sm text-gray-800">{notif.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSettings(!showSettings);
                    setShowProfile(false);
                    setShowNotifications(false);
                  }}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <Settings className="w-6 h-6" />
                </button>

                {showSettings && (
                  <div
                    className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-2xl border z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-4 border-b">
                      <h3 className="font-semibold text-gray-800">Settings</h3>
                    </div>
                    <div className="p-2 space-y-1">
                      <button
                        onClick={() => {
                          setShowChangePassword(true);
                          setShowSettings(false);
                        }}
                        className="w-full flex items-center space-x-2 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Lock className="w-4 h-4" />
                        <span>Change Password</span>
                      </button>
                      <button
                        onClick={() => {
                          setShowPrivacyPolicy(true);
                          setShowSettings(false);
                        }}
                        className="w-full flex items-center space-x-2 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Privacy Policy</span>
                      </button>
                      <button
                        onClick={() => {
                          setShowSignOutConfirm(true);
                          setShowSettings(false);
                        }}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowProfile(!showProfile);
                    setShowNotifications(false);
                    setShowSettings(false);
                  }}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                    {user.profilePhoto ? (
                      <img
                        src={user.profilePhoto}
                        alt={user.firstName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-sm font-bold">{getInitials(user.firstName)}</span>
                    )}
                  </div>
                  <div className="text-left hidden md:block">
                    <p className="text-sm font-semibold text-white">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-gray-500">{user.bloodGroup}</p>
                  </div>
                </button>

                {showProfile && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-2xl border z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => {
                        setShowProfilePage(true);
                        setShowProfile(false);
                      }}
                      className="w-full p-4 hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                          {user.profilePhoto ? (
                            <img
                              src={user.profilePhoto}
                              alt={user.firstName}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-white text-lg font-bold">{getInitials(user.firstName)} {getInitials(user.lastName)}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white
                           truncate">{user.firstName} {user.lastName}</h3>
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

      {/* Emergency Alert Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="bg-yellow-400 text-red-900 text-xs font-bold px-2 py-1 rounded">
                    LIVE EMERGENCY
                  </span>
                  <span className="text-sm">{activeEmergency.time}</span>
                </div>
                <h2 className="text-xl font-bold">{activeEmergency.title}</h2>
                <div className="flex items-center space-x-4 mt-2 text-sm">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{activeEmergency.city}</span>
                  </span>
                  <span>• {activeEmergency.patientsAffected} patients</span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-sm">Blood Needed:</span>
                  {activeEmergency.bloodNeeded.map((bg) => (
                    <span
                      key={bg}
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        user.bloodGroup === bg ? 'bg-yellow-400 text-red-900' : 'bg-white/20'
                      }`}
                    >
                      {bg}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-red-50 transition-colors hidden md:block">
              RESPOND NOW
            </button>
          </div>
        </div>
      </div>

      {/* Slot Booking Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <MapPin className="w-6 h-6 text-red-600" />
              <span>Book Emergency Donation Slot - {activeEmergency.city}</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Hospital</label>
                <select
                  value={selectedHospital}
                  onChange={(e) => {
                    setSelectedHospital(e.target.value);
                    setSelectedSlot('');
                  }}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 text-black"
                  // disabled={!isEligibleNow}
                >
                  <option value="">Choose a hospital</option>
                  {nearbyHospitals.map((hospital) => (
                    <option key={hospital.id} value={hospital.id}>
                      {hospital.name} - {hospital.address}
                    </option>
                  ))}
                </select>
              </div>

              {selectedHospital && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Available Time Slots</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {nearbyHospitals
                      .find((h) => h.id === parseInt(selectedHospital))
                      ?.slots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-3 border rounded-lg transition-colors ${
                            selectedSlot === slot
                              ? 'bg-red-600 text-white border-red-600'
                              : 'bg-white text-gray-700 hover:border-red-600'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {selectedHospital && selectedSlot && (
                <button
                  onClick={handleSlotBooking}
                  className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                >
                  Confirm Booking
                </button>
              )}

              {/* {!isEligibleNow && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                  You can book a slot {calculateDaysUntilEligible()} days from now. Check back on {user.nextEligible}!
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div
            onClick={() => scrollToSection(donationHistoryRef)}
            className="bg-white p-6 rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <Droplet className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">{user.totalDonations}</h3>
            <p className="text-sm text-gray-600">Total Donations</p>
          </div>

          <div
            onClick={() => scrollToSection(impactRef)}
            className="bg-white p-6 rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">{user.livesImpacted}</h3>
            <p className="text-sm text-gray-600">Lives Impacted</p>
          </div>
 
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-800">{user.lastDonation}</h3>
            <p className="text-sm text-gray-600">Last Donation</p>
            {isEligibleNow && <div className="mt-2 text-xs text-green-600 font-semibold">✓ Eligible to donate</div>}
          </div>

          <div
            onClick={() => scrollToSection(badgesRef)}
            className="bg-white p-6 rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">{user.badges.length}</h3>
            <p className="text-sm text-gray-600">Badges Earned</p>
          </div>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Donation History */}
          {/* <div className="lg:col-span-2">
            <div ref={donationHistoryRef} className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <Clock className="w-6 h-6 text-red-600" />
                <span>Donation History</span>
              </h2>
              <div className="space-y-3">
                {donationHistory.map((donation, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-800">{donation.hospital}</p>
                      <p className="text-sm text-gray-600">{donation.date}</p>
                    </div>
                    <div className="text-right">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        {donation.status}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">{donation.bloodGroup}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div> */}

          {/* Badges and Impact */}
          <div className="space-y-6">
            {/* <div ref={badgesRef} className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <Award className="w-6 h-6 text-red-600" />
                <span>Earned Badges</span>
              </h2>
              <div className="space-y-3">
                {user.badges.map((badge, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-yellow-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{badge}</p>
                      <p className="text-xs text-gray-600">Achievement unlocked</p>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Impact Summary */}
            {/* <div ref={impactRef} className="bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Your Impact</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-4xl font-bold">{user.livesImpacted}</p>
                  <p className="text-sm text-blue-100">Lives potentially saved</p>
                </div>
                <div className="bg-white/20 h-px"></div>
                <p className="text-sm text-blue-100">
                  Each donation can save up to 3 lives. Your contributions have made a significant impact in emergency situations.
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>   
      

      {/* Profile Page Modal */}
      {showProfilePage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full my-8">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-2xl font-bold text-gray-800">Profile</h3>
              <button onClick={() => setShowProfilePage(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6 pb-6 border-b">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  {user.profilePhoto ? (
                    <img src={user.profilePhoto} alt={user.firstName} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-white text-2xl font-bold">{getInitials(user.firstName)}</span>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{user.firstName}</h2>
                  <p className="text-gray-600">
                    Blood Group: <span className="font-semibold text-red-600">{user.bloodGroup}</span>
                  </p>
                  <p className="text-sm text-gray-500">Member since {user.memberSince}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Email</span>
                    <span className="font-semibold text-black">{user.email}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">contactNo</span>
                    <span className="font-semibold text-black">{user.contactNo}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">city</span>
                    <span className="font-semibold text-black text-right">{user.city}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {/* {showChangePassword && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold text-gray-800">Change Password</h3>
              <button
                onClick={() => {
                  setShowChangePassword(false);
                  setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                }}
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
                    {showCurrentPwd ? (
                      <EyeOff className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-500" />
                    )}
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
                    {showNewPwd ? (
                      <EyeOff className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-500" />
                    )}
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
                    {showConfirmPwd ? (
                      <EyeOff className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={handlePasswordChange}
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )} */}

      {/* Privacy Policy Modal */}
      {showPrivacyPolicy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full my-8">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-2xl font-bold text-gray-800">Privacy Policy</h3>
              <button
                onClick={() => setShowPrivacyPolicy(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="space-y-4 text-gray-700">
                <section>
                  <h4 className="font-bold text-lg text-gray-800 mb-2">VitalLink Privacy Policy</h4>
                  <p className="text-sm">Last Updated: October 2025</p>
                </section>

                <section>
                  <h4 className="font-semibold text-gray-800 mb-2">1. Information We Collect</h4>
                  <p className="text-sm">
                    VitalLink collects personal information including your name, email address, contactNo number, blood group,
                    city, and donation history to facilitate emergency blood donation services. We collect this
                    information with your explicit consent during registration.
                  </p>
                </section>

                <section>
                  <h4 className="font-semibold text-gray-800 mb-2">2. How We Use Your Information</h4>
                  <p className="text-sm">Your information is used to:</p>
                  <ul className="list-disc list-inside text-sm ml-4 mt-2 space-y-1">
                    <li>Connect you with nearby emergency blood donation requests</li>
                    <li>Schedule donation appointments at partner hospitals</li>
                    <li>Send critical emergency notifications</li>
                    <li>Track your donation history and eligibility</li>
                    <li>Provide you with badges and achievements</li>
                  </ul>
                </section>

                <section>
                  <h4 className="font-semibold text-gray-800 mb-2">3. Data Security</h4>
                  <p className="text-sm">
                    We implement industry-standard security measures to protect your personal information. Your data is
                    encrypted during transmission and storage. We never share your personal information with third parties
                    without your explicit consent, except when required by law or for emergency medical purposes.
                  </p>
                </section>

                <section>
                  <h4 className="font-semibold text-gray-800 mb-2">4. Information Sharing</h4>
                  <p className="text-sm">We may share your information with:</p>
                  <ul className="list-disc list-inside text-sm ml-4 mt-2 space-y-1">
                    <li>Partner hospitals for donation appointment purposes</li>
                    <li>Emergency medical services during critical situations</li>
                    <li>Law enforcement when legally required</li>
                  </ul>
                </section>

                <section>
                  <h4 className="font-semibold text-gray-800 mb-2">5. Your Rights</h4>
                  <p className="text-sm">You have the right to:</p>
                  <ul className="list-disc list-inside text-sm ml-4 mt-2 space-y-1">
                    <li>Access your personal information at any time</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Delete your account and associated data</li>
                    <li>Opt-out of non-emergency notifications</li>
                    <li>Export your donation history</li>
                  </ul>
                </section>

                <section>
                  <h4 className="font-semibold text-gray-800 mb-2">6. Emergency Notifications</h4>
                  <p className="text-sm">
                    By using VitalLink, you consent to receive emergency notifications for critical blood donation needs.
                    These notifications are essential to the service and cannot be disabled. However, you can adjust your
                    notification preferences for non-emergency communications.
                  </p>
                </section>

                <section>
                  <h4 className="font-semibold text-gray-800 mb-2">7. Data Retention</h4>
                  <p className="text-sm">
                    We retain your personal information for as long as your account is active. Donation history records are
                    maintained for medical and legal compliance purposes. You may request account deletion at any time
                    through settings.
                  </p>
                </section>

                <section>
                  <h4 className="font-semibold text-gray-800 mb-2">8. Cookies and Tracking</h4>
                  <p className="text-sm">
                    VitalLink uses essential cookies to maintain your session and improve user experience. We do not use
                    tracking cookies for advertising purposes.
                  </p>
                </section>

                <section>
                  <h4 className="font-semibold text-gray-800 mb-2">9. Changes to Privacy Policy</h4>
                  <p className="text-sm">
                    We may update this privacy policy from time to time. We will notify you of any significant changes via
                    email or through the platform. Continued use of VitalLink after changes constitutes acceptance of the
                    updated policy.
                  </p>
                </section>

                <section>
                  <h4 className="font-semibold text-gray-800 mb-2">10. Contact Us</h4>
                  <p className="text-sm">
                    For privacy-related questions or concerns, please contact us at privacy@vitallink.com or through our
                    support channels.
                  </p>
                </section>

                <section className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-gray-800">Our Commitment</p>
                  <p className="text-sm mt-2">
                    VitalLink is committed to protecting your privacy while facilitating life-saving blood donations. Your
                    trust is paramount to our mission of connecting donors with those in need during emergencies.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sign Out Confirmation Modal */}
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

      {/* Slot Confirmation Modal */}
      {showSlotConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Slot Confirmed!</h3>
            <p className="text-gray-600 mb-4">
              Your donation slot has been successfully booked. You'll receive a confirmation email shortly.
            </p>
            <p className="text-sm text-gray-500">
              Hospital: {nearbyHospitals.find((h) => h.id === parseInt(selectedHospital))?.name}
              <br />
              Time: {selectedSlot}
            </p>
          </div>
        </div>
      )}
    </div>
  );


};

export default DonorDashboard;