export const API_BASE_URL = 'mock-api';

export const sendOtp = async (email: string) => {
  console.log(`[MOCK OTP] Sending OTP to email: ${email}`);
  const otp = '123456';
  localStorage.setItem(`otp_driver_${email}`, otp);
  
  // Return the OTP in the response for convenience of testing/demo
  return { success: true, message: 'OTP sent successfully (mock)', otp };
};

export const verifyOtp = async (email: string, otp: string) => {
  const storedOtp = localStorage.getItem(`otp_driver_${email}`);
  if (storedOtp === otp) {
    localStorage.removeItem(`otp_driver_${email}`);
    return { success: true, message: 'OTP Verified Successfully (mock)' };
  }
  return { success: false, message: 'Invalid OTP (mock)' };
};

export const registerDriver = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const age = formData.get('age') as string;
  const address = formData.get('address') as string;

  const driverData = { email, name, phone, age, address };
  
  const existingDrivers = JSON.parse(localStorage.getItem('drivers') || '[]');
  existingDrivers.push(driverData);
  localStorage.setItem('drivers', JSON.stringify(existingDrivers));
  
  console.log('Driver Registered (Mock):', driverData);
  return { success: true, message: 'Driver registered successfully (mock)' };
};
