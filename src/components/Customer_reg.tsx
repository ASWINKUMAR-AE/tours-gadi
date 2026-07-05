import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from './SEO';
import Breadcrumb from './Breadcrumb';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import '@dotlottie/player-component';
import { CSSTransition } from 'react-transition-group';
import './CustomerSignUp.css';
import { sendOtp, verifyOtp, registerCustomer } from '../services/customerService';

interface FormData {
  name: string;
  age: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  verificationCode: string;
}

const CustomerSignUp: React.FC = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    verificationCode: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState<'success' | 'danger'>('danger');
  const alertRef = useRef(null);

  const generateOTP = async () => {
    try {
      const data = await sendOtp(formData.email);
      if (data.success) {
        return true;
      } else {
        showErrorAlert(data.message || 'Failed to send OTP email');
        return false;
      }
    } catch (error) {
      showErrorAlert('Failed to send OTP');
      return false;
    }
  };

  const validateStage1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    else if (formData.name.trim().length < 3) newErrors.name = 'Name must be at least 3 characters';

    if (!formData.age) newErrors.age = 'Age is required';
    else if (parseInt(formData.age) < 18) newErrors.age = 'You must be at least 18 years old';

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';

    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = 'Please enter a valid 10-digit phone number';

    if (!formData.address.trim()) newErrors.address = 'Address is required';
    else if (formData.address.trim().length < 10) newErrors.address = 'Address must be at least 10 characters';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStage2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.verificationCode) newErrors.verificationCode = 'Verification code is required';
    else if (!/^[0-9]{6}$/.test(formData.verificationCode)) newErrors.verificationCode = 'Code must be 6 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showErrorAlert = (message: string) => {
    setAlertMessage(message);
    setAlertVariant('danger');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const showSuccessAlert = (message: string) => {
    setAlertMessage(message);
    setAlertVariant('success');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = stage === 1 ? validateStage1() : validateStage2();
    if (!isValid) {
      showErrorAlert('Please fix the errors in the form');
      return;
    }

    if (stage === 1) {
      const otpSent = await generateOTP();
      if (otpSent) setStage(2);
      return;
    }

    if (stage === 2) {
      try {
        const verifyResponse = await verifyOtp(formData.email, formData.verificationCode);
        if (!verifyResponse.success) {
          showErrorAlert(verifyResponse.message || 'Invalid verification code');
          return;
        }

        const registrationResponse = await registerCustomer({
          name: formData.name,
          age: parseInt(formData.age),
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          password: formData.password
        });

        if (registrationResponse.success) {
          showSuccessAlert('Registration successful! Redirecting to login...');
          setTimeout(() => navigate('/customer_app'), 2500);
        } else {
          showErrorAlert(registrationResponse.message || 'Signup failed.');
        }
      } catch (error) {
        showErrorAlert('An error occurred during registration.');
      }
    }
  };

  const handleBack = () => {
    if (stage > 1) setStage(stage - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const resendOTP = async () => {
    const otpSent = await generateOTP();
    if (otpSent) {
      showSuccessAlert('A new verification code has been sent to your email.');
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex align-items-stretch overflow-hidden">
      <SEO
        title="Customer Registration - Sign Up for Premium Cabs & Tours"
        description="Create a TourGadi account to instantly book customized holiday packages and local rides with transparent upfront pricing."
        keywords="create tourgadi account, customer sign up, book ride, book tour package, sign up tourgadi"
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "TourGadi User App",
          "operatingSystem": "Android, iOS",
          "applicationCategory": "TravelApplication",
          "downloadUrl": "https://tourgadi.in/apps/rider.apk",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR"
          }
        }}
      />
      <CSSTransition
        in={showAlert}
        timeout={300}
        classNames="alert"
        unmountOnExit
        nodeRef={alertRef}
      >
        <div ref={alertRef} className="alert-notification">
          <Alert 
            variant={alertVariant} 
            onClose={() => setShowAlert(false)} 
            dismissible
            className="shadow-lg"
          >
            {alertMessage}
          </Alert>
        </div>
      </CSSTransition>

      <Row className="flex-grow-1 w-100 m-0">
        <Col
          md={6}
          className="d-none d-md-flex justify-content-center align-items-center text-white p-0"
          style={{ backgroundColor: '#1d1e1e', marginLeft: '-20px' }}
        >
          <dotlottie-player
            src="https://lottie.host/a128294a-048c-43c1-b157-c835e0576663/6IbslsrOwe.lottie"
            background="transparent"
            speed="1"
            style={{ width: '100%', height: 'auto' }}
            loop
            autoplay
          />
        </Col>

        <Col md={6} className="p-5 d-flex flex-column justify-content-center bg-white rounded-5 shadow-sm">
          {/* Breadcrumb Navigation */}
          <div className="d-flex justify-content-center mb-3">
            <Breadcrumb items={[{ label: 'Register', path: '/signup/customer' }, { label: 'Rider' }]} />
          </div>
          <div className="text-center mb-4">
            <h1 className="display-6 fw-bold mb-3" style={{ color: '#000', letterSpacing: '-0.5px' }}>
              <span className="d-inline-block" style={{ 
                borderBottom: '3px solid #000',
                paddingBottom: '5px'
              }}>
                Create Customer Account
              </span>
            </h1>
            <p className="text-muted">Complete your profile in 2 easy steps</p>
          </div>

          <div className="stepper-container mb-5 position-relative">
            <div className="d-flex justify-content-between align-items-center position-relative">
              {[1, 2].map((step) => (
                <React.Fragment key={step}>
                  <div 
                    className={`step-circle ${step <= stage ? 'active' : ''}`}
                    onClick={() => stage > step && setStage(step)}
                    style={{ cursor: stage > step ? 'pointer' : 'default' }}
                  >
                    <div className="step-number">{step}</div>
                    {step <= stage && (
                      <div className="step-check">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                    <div className="step-label">{['Personal Info', 'Verification'][step-1]}</div>
                  </div>
                  
                  {step < 2 && (
                    <div className={`connector ${step < stage ? 'active' : ''}`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <Form onSubmit={handleSubmit} noValidate className="px-3">
            {stage === 1 && (
              <div className="row g-3">
                <div className="col-md-6">
                  <Form.Group controlId="formName">
                    <Form.Label className="fw-medium text-dark">Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                      placeholder="Aswin kumar"
                      className="py-3 border-dark border-2 rounded-5"
                      style={{ background: 'transparent' }}
                    />
                    <Form.Control.Feedback type="invalid" className="fw-medium">
                      <i className="bi bi-exclamation-circle me-2"></i>
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group controlId="formAge">
                    <Form.Label className="fw-medium text-dark">Age</Form.Label>
                    <Form.Control
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      isInvalid={!!errors.age}
                      placeholder="25"
                      min={18}
                      className="py-3 border-dark border-2 rounded-5"
                      style={{ background: 'transparent' }}
                    />
                    <Form.Control.Feedback type="invalid" className="fw-medium">
                      <i className="bi bi-exclamation-circle me-2"></i>
                      {errors.age}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>

                <div className="col-12">
                  <Form.Group controlId="formEmail">
                    <Form.Label className="fw-medium text-dark">Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      placeholder="wavecab@example.com"
                      className="py-3 border-dark border-2 rounded-5"
                      style={{ background: 'transparent' }}
                    />
                    <Form.Control.Feedback type="invalid" className="fw-medium">
                      <i className="bi bi-exclamation-circle me-2"></i>
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group controlId="formPhone">
                    <Form.Label className="fw-medium text-dark">Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      isInvalid={!!errors.phone}
                      placeholder="9876543210"
                      maxLength={10}
                      className="py-3 border-dark border-2 rounded-5"
                      style={{ background: 'transparent' }}
                    />
                    <Form.Control.Feedback type="invalid" className="fw-medium">
                      <i className="bi bi-exclamation-circle me-2"></i>
                      {errors.phone}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group controlId="formAddress">
                    <Form.Label className="fw-medium text-dark">Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={1}
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      isInvalid={!!errors.address}
                      placeholder="123 Main St, City"
                      className="py-3 border-dark border-2 rounded-5"
                      style={{ background: 'transparent', resize: 'none' }}
                    />
                    <Form.Control.Feedback type="invalid" className="fw-medium">
                      <i className="bi bi-exclamation-circle me-2"></i>
                      {errors.address}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>

                <div className="col-12">
                  <Form.Group controlId="formPassword">
                    <Form.Label className="fw-medium text-dark">Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                      placeholder="••••••••"
                      className="py-3 border-dark border-2 rounded-5"
                      style={{ background: 'transparent' }}
                    />
                    <Form.Control.Feedback type="invalid" className="fw-medium">
                      <i className="bi bi-exclamation-circle me-2"></i>
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>
            )}

            {stage === 2 && (
              <div className="text-center">
                <div className="mb-4 p-4 bg-light rounded-5">
                  <i className="bi bi-envelope-check fs-1 mb-3" style={{ color: '#000' }}></i>
                  <h5 className="fw-bold">Verify Your Identity</h5>
                  <p className="text-muted">
                    We sent a 6-digit code to <span className="fw-medium">{formData.email}</span>
                  </p>
                </div>

                <Form.Group controlId="formVerificationCode" className="mb-4">
                  <div className="d-flex justify-content-center">
                    {[...Array(6)].map((_, i) => (
                      <Form.Control
                        key={i}
                        type="text"
                        maxLength={1}
                        name="verificationCode"
                        value={formData.verificationCode[i] || ''}
                        onChange={(e) => {
                          const newCode = formData.verificationCode.split('');
                          newCode[i] = e.target.value;
                          handleChange({
                            target: { name: 'verificationCode', value: newCode.join('') }
                          } as React.ChangeEvent<HTMLInputElement>);
                          if (e.target.value && i < 5) {
                            (document.getElementById(`digit-${i+1}`) as HTMLInputElement)?.focus();
                          }
                        }}
                        className="mx-1 text-center py-3 fw-bold fs-5 border-dark border-2 rounded-5"
                        style={{ width: '50px', color: '#000' }}
                        id={`digit-${i}`}
                        isInvalid={!!errors.verificationCode}
                      />
                    ))}
                  </div>
                  {errors.verificationCode && (
                    <div className="text-danger fw-medium mt-2">
                      <i className="bi bi-exclamation-circle me-2"></i>
                      {errors.verificationCode}
                    </div>
                  )}
                </Form.Group>

                <Button 
                  variant="link" 
                  onClick={resendOTP} 
                  className="text-decoration-none fw-medium p-0"
                  style={{ color: '#000' }}
                >
                  <i className="bi bi-arrow-repeat me-2"></i>
                  Didn't receive code? Resend
                </Button>
              </div>
            )}

            <div className="d-flex justify-content-between mt-5 pt-3 border-top border-dark">
              {stage > 1 ? (
                <Button 
                  variant="outline-dark" 
                  onClick={handleBack}
                  className="w-100 px-4 py-3 rounded-5 fw-medium d-flex align-items-center justify-content-center me-2"
                >
                  <i className="bi bi-chevron-left me-2"></i>
                  Previous
                </Button>
              ) : (
                <Button 
                  variant="outline-dark" 
                  onClick={() => navigate('/')}
                  className="w-100 px-4 py-3 rounded-5 fw-medium d-flex align-items-center justify-content-center me-2"
                >
                  <i className="bi bi-x-lg me-2"></i>
                  Cancel
                </Button>
              )}
              
              <Button 
                type="submit" 
                className="w-100 px-4 py-3 rounded-5 fw-medium d-flex align-items-center justify-content-center"
                style={{ 
                  backgroundColor: '#000',
                  borderColor: '#000'
                }}
              >
                {stage === 2 ? 'Complete Registration' : 'Continue'}
                <i className={`bi bi-chevron-right ms-2 ${stage === 2 ? 'd-none' : ''}`}></i>
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomerSignUp;