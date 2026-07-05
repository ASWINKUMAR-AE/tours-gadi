export interface ApiResponse {
  success: boolean;
  message?: string;
  customerId?: number;
  otp?: string;
}

export interface CustomerData {
  name: string;
  age: number;
  email: string;
  phone: string;
  address: string;
  password: string;
}

export const sendOtp = async (email: string): Promise<ApiResponse> => {
  console.log(`[MOCK OTP] Sending OTP to customer email: ${email}`);
  const otp = '123456';
  localStorage.setItem(`otp_customer_${email}`, otp);
  
  // Return the OTP in the response for convenience of testing/demo
  return { success: true, message: 'OTP sent successfully (mock)', otp };
};

export const verifyOtp = async (email: string, otp: string): Promise<ApiResponse> => {
  const storedOtp = localStorage.getItem(`otp_customer_${email}`);
  if (storedOtp === otp) {
    localStorage.removeItem(`otp_customer_${email}`);
    return { success: true, message: 'OTP verified successfully (mock)' };
  }
  return { success: false, message: 'Invalid OTP (mock)' };
};

export const registerCustomer = async (customerData: CustomerData): Promise<ApiResponse> => {
  const existingCustomers = JSON.parse(localStorage.getItem('customers') || '[]');
  
  // Check if exists
  if (existingCustomers.some((c: any) => c.email === customerData.email)) {
    return { success: false, message: 'Email already registered' };
  }
  
  existingCustomers.push(customerData);
  localStorage.setItem('customers', JSON.stringify(existingCustomers));
  
  console.log('Customer Registered (Mock):', customerData);
  return { success: true, message: 'Registration successful (mock)', customerId: Date.now() };
};