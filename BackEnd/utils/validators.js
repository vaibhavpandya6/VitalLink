const validateEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // Minimum 6 characters
  return password && password.length >= 6;
};

const validateContactNo = (contactNo) => {
  const contactRegex = /^[0-9]{10}$/;
  return contactRegex.test(contactNo);
};

const validateAadhar = (aadhar) => {
  const aadharRegex = /^[0-9]{12}$/;
  return aadharRegex.test(aadhar);
};

const validatePincode = (pincode) => {
  const pincodeRegex = /^[0-9]{6}$/;
  return pincodeRegex.test(pincode);
};

const validateRegistrationData = (data) => {
  const errors = [];

  if (!data.firstName) errors.push('First name is required');
  if (!data.lastName) errors.push('Last name is required');
  if (!data.age) errors.push('Age is required');
  if (!data.gender) errors.push('Gender is required');
  if (!data.dateOfBirth) errors.push('Date of birth is required');
  if (!data.bloodGroup) errors.push('Blood group is required');
  if (!data.email) errors.push('Email is required');
  if (!data.contactNo) errors.push('Contact number is required');
  if (!data.aadharNumber) errors.push('Aadhar number is required');
  if (!data.state) errors.push('State is required');
  if (!data.city) errors.push('City is required');
  if (!data.pincode) errors.push('Pincode is required');
  if (!data.address) errors.push('Address is required');
  if (!data.password) errors.push('Password is required');

  if (data.email && !validateEmail(data.email)) errors.push('Invalid email format');
  if (data.contactNo && !validateContactNo(data.contactNo)) errors.push('Contact number must be 10 digits');
  if (data.aadharNumber && !validateAadhar(data.aadharNumber)) errors.push('Aadhar number must be 12 digits');
  if (data.pincode && !validatePincode(data.pincode)) errors.push('Pincode must be 6 digits');
  if (data.password && !validatePassword(data.password)) errors.push('Password must be at least 6 characters');

  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = {
  validateEmail,
  validatePassword,
  validateContactNo,
  validateAadhar,
  validatePincode,
  validateRegistrationData,
};