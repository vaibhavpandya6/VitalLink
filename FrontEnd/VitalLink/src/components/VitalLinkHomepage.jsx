import React, { useState, useEffect } from 'react';
import { Heart, MapPin, Bell, Shield, Users, Clock, ChevronRight, Menu, X } from 'lucide-react';

import { useNavigate, Link } from "react-router-dom";

const VitalLinkHomepage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: MapPin,
      title: "Geolocation Matching",
      description: "Connect with nearby donors and hospitals using smart location-based matching"
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Instant notifications for emergency blood requests and donation opportunities"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Advanced security measures protect donor and hospital data with encryption"
    },
    {
      icon: Clock,
      title: "Real-Time Response",
      description: "Faster emergency response times during critical situations and disasters"
    }
  ];

  return (
    <div className="min-h-screen bg-white w-full">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-current" />
              </div>
              <span className="text-2xl font-bold text-black">VitalLink</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-black hover:text-red-600 transition-colors duration-200 font-medium">
                Home
              </a>
              <a href="#about" className="text-black hover:text-red-600 transition-colors duration-200 font-medium">
                About
              </a>
              <a href="#contact" className="text-black hover:text-red-600 transition-colors duration-200 font-medium">
                Contact Us
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium"
              onClick={() => navigate("/SignIn")}>
                Sign In 
              </button>
              <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-200 font-medium shadow-lg"
              onClick={() => navigate("/SignUp")}>
                Sign Up
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-black hover:text-red-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-4 space-y-4">
              <a href="#home" className="block text-black hover:text-red-600 transition-colors font-medium">
                Home
              </a>
              <a href="#about" className="block text-black hover:text-red-600 transition-colors font-medium">
                About
              </a>
              <a href="#contact" className="block text-black hover:text-red-600 transition-colors font-medium">
                Contact Us
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <button className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                onClick={() => navigate("/SignIn")}
                >
                  Sign In
                </button>
                <button className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 bg-gradient-to-br w-screen h-screen from-white via-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-black leading-tight">
                  Connecting Lives Through
                  <span className="text-red-600 block">Blood Donation</span>
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  VitalLink is a comprehensive web-based platform that connects blood donors with hospitals in real time, enabling faster response during emergencies and disasters.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg flex items-center justify-center space-x-2"
                onClick={()=>navigate("/SignUp")}>
                  <span>Become a Donor</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 font-semibold"
                onClick={() => navigate("/SignIn")}>
                  Sign In
                </button>
                <button className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 font-semibold transform hover:scale-105"
                onClick={() => navigate("/HospitalRegistration")}>
                  Register as Hospital
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">24/7</div>
                  <div className="text-sm text-gray-600">Available</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">1000+</div>
                  <div className="text-sm text-gray-600">Donors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">50+</div>
                  <div className="text-sm text-gray-600">Hospitals</div>
                </div>
              </div>
            </div>

            <div className="relative w-full">
              <div className="w-full h-96 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center shadow-2xl">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <Heart className="w-12 h-12 text-white fill-current" />
                  </div>
                  <h3 className="text-2xl font-bold text-red-700">Save Lives Today</h3>
                  <p className="text-red-600">Every donation counts</p>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center">
                <Users className="w-10 h-10 text-red-600" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-red-600 rounded-full shadow-lg flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl font-bold text-black">How VitalLink Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform leverages geolocation and smart alerts to create an efficient, secure, 
              and user-friendly ecosystem for blood donation that saves lives when it matters most.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-white border border-gray-100 rounded-xl hover:shadow-xl hover:border-red-200 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-red-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white">Ready to Save Lives?</h2>
            <p className="text-xl text-red-100 max-w-2xl mx-auto">
              Join thousands of donors and healthcare professionals who trust VitalLink 
              to make blood donation faster, safer, and more efficient.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-200 font-semibold shadow-lg">
                Get Started Today
              </button>
              <button className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 font-semibold">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black text-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white fill-current" />
                </div>
                <span className="text-xl font-bold">VitalLink</span>
              </div>
              <p className="text-gray-400">
                Connecting lives through efficient blood donation in emergencies.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-red-400 transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-red-400 transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-red-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-red-400 transition-colors">Blood Donation</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors">Emergency Alerts</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors">Hospital Network</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>Emergency: 24/7 Available</p>
                <p>Email: help@vitallink.com</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 VitalLink. All rights reserved. Saving lives together.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VitalLinkHomepage;