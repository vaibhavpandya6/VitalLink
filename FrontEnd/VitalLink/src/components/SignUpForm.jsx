/*
SignUpForm.jsx
A standalone React component for the VitalLink Sign Up feature.
Includes:
- All required form fields
- Validations
- Tailwind styling
- Accessible labels and errors

Usage:
import SignUpForm from './SignUpForm';

Props:
- onSuccess: callback after successful signup
- onCancel: callback when user cancels signup
*/

import React, { useState } from "react";

function FormField({ id, label, type = "text", value, onChange, placeholder, error }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`block w-full rounded-md border px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${error ? 'border-red-400' : 'border-gray-200'}`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default function SignUpForm({ onSuccess, onCancel }) {
  const [form, setForm] = useState({
    fullName: "",
    age: "",
    gender: "",
    city: "",
    address: "",
    bloodGroup: "",
    previousDisease: "",
    password: "",
    confirmPassword: "",
    donatedIn2Months: false,
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  }

  function validate() {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Please enter your full name.";
    if (!form.age) newErrors.age = "Please enter your age.";
    else if (isNaN(Number(form.age)) || Number(form.age) <= 0) newErrors.age = "Enter a valid age.";
    if (!form.gender) newErrors.gender = "Please select your gender.";
    if (!form.city.trim()) newErrors.city = "Please enter your city.";
    if (!form.address.trim()) newErrors.address = "Please enter your address.";
    if (!form.bloodGroup) newErrors.bloodGroup = "Please select your blood group.";
    if (!form.password) newErrors.password = "Please create a password.";
    else if (form.password.length < 8) newErrors.password = "Password should be at least 8 characters.";
    if (!form.confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
    else if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      fullName: form.fullName.trim(),
      age: Number(form.age),
      gender: form.gender,
      city: form.city.trim(),
      address: form.address.trim(),
      bloodGroup: form.bloodGroup,
      previousDisease: form.previousDisease.trim(),
      donatedIn2Months: !!form.donatedIn2Months,
      password: form.password,
    };

    // Simulate success
    setTimeout(() => {
      if (onSuccess) onSuccess(payload);
      setForm({
        fullName: "",
        age: "",
        gender: "",
        city: "",
        address: "",
        bloodGroup: "",
        previousDisease: "",
        password: "",
        confirmPassword: "",
        donatedIn2Months: false,
      });
    }, 500);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FormField id="fullName" label="Full name" value={form.fullName} onChange={handleChange} placeholder="e.g. Priya Sharma" error={errors.fullName} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <FormField id="age" label="Age" value={form.age} onChange={handleChange} placeholder="e.g. 29" error={errors.age} />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select id="gender" name="gender" value={form.gender} onChange={handleChange} className={`block w-full rounded-md border px-3 py-2 text-sm shadow-sm ${errors.gender ? 'border-red-400' : 'border-gray-200'}`}>
            <option value="">Select gender</option>
            <option>Female</option>
            <option>Male</option>
            <option>Non-binary</option>
            <option>Prefer not to say</option>
          </select>
          {errors.gender && <p className="mt-1 text-xs text-red-600">{errors.gender}</p>}
        </div>

        <FormField id="city" label="City" value={form.city} onChange={handleChange} placeholder="e.g. Mumbai" error={errors.city} />
      </div>

      <FormField id="address" label="Address" value={form.address} onChange={handleChange} placeholder="Street, neighbourhood, landmark" error={errors.address} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Blood group</label>
          <select id="bloodGroup" name="bloodGroup" value={form.bloodGroup} onChange={handleChange} className={`block w-full rounded-md border px-3 py-2 text-sm shadow-sm ${errors.bloodGroup ? 'border-red-400' : 'border-gray-200'}`}>
            <option value="">Select blood group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>
          {errors.bloodGroup && <p className="mt-1 text-xs text-red-600">{errors.bloodGroup}</p>}
        </div>

        <FormField id="previousDisease" label="Previous or existing disease (optional)" value={form.previousDisease} onChange={handleChange} placeholder="e.g. Hypertension, Diabetes or 'None'" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <FormField id="password" label="Create password" type="password" value={form.password} onChange={handleChange} placeholder="At least 8 characters" error={errors.password} />
        <FormField id="confirmPassword" label="Confirm password" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Re-enter your password" error={errors.confirmPassword} />
      </div>

      <div className="flex items-center gap-2 mt-2">
        <input id="donatedIn2Months" name="donatedIn2Months" type="checkbox" checked={form.donatedIn2Months} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
        <label htmlFor="donatedIn2Months" className="text-sm text-gray-700">I have donated blood in the past 2 months</label>
      </div>

      <p className="mt-3 text-xs text-gray-500">By creating an account you agree to our Terms and Privacy Policy. Sensitive health information is kept private; only relevant details will be shared with authorised hospitals or patients when you consent.</p>

      <div className="mt-6 flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md border">Cancel</button>
        <button type="submit" className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Create account</button>
      </div>
    </form>
  );
}