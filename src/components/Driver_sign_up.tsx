import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from './SEO';
import Breadcrumb from './Breadcrumb';
import { Container, Row, Col, Form, Button, ProgressBar, Alert } from 'react-bootstrap';
import '@dotlottie/player-component';
import { CSSTransition } from 'react-transition-group';
import './DriverSignUp.css';
import { sendOtp, registerDriver, verifyOtp, API_BASE_URL } from '../services/driverService';

const DriverSignUp: React.FC = () => {
  const navigate = useNavigate();

  // Stage 1: Personal Info, Stage 2: Documents, Stage 3: OTP Verification
  const [stage, setStage] = useState<number>(1);

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    address: '',
    licenseFile: null as File | null,
    aadharFile: null as File | null,
    rcBookFile: null as File | null,
    panCardFile: null as File | null,
    verificationCode: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState<'success' | 'danger'>('danger');
  const [generatedOTP, setGeneratedOTP] = useState('');
  const alertRef = useRef(null);

  // Generate and send OTP to email
  const generateOTP = async () => {
    const data = await sendOtp(formData.email);
    if (data.success) {
      setGeneratedOTP(data.otp);
    } else {
      showErrorAlert('Failed to send OTP email');
    }
  };
  // Validation functions per stage
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStage2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.licenseFile) newErrors.licenseFile = 'Driver license is required';
    if (!formData.aadharFile) newErrors.aadharFile = 'Aadhar card is required';
    if (!formData.rcBookFile) newErrors.rcBookFile = 'RC book is required';
    if (!formData.panCardFile) newErrors.panCardFile = 'PAN card is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStage3 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.verificationCode) newErrors.verificationCode = 'Verification code is required';
    else if (!/^[0-9]{6}$/.test(formData.verificationCode)) newErrors.verificationCode = 'Code must be 6 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Show error alert helper
  const showErrorAlert = (message: string) => {
    setAlertMessage(message);
    setAlertVariant('danger');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  // Handle form submit per stage
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = false;
    if (stage === 1) isValid = validateStage1();
    else if (stage === 2) isValid = validateStage2();
    else if (stage === 3) isValid = validateStage3();

    if (!isValid) {
      showErrorAlert('Please fix the errors in the form');
      return;
    }

    if (stage === 2) {
      await generateOTP(); // Generate OTP before stage 3
      setStage(3);
      return;
    }

    if (stage === 3) {
      // Verify OTP with backend
      try {
        const verifyResponse = await verifyOtp(formData.email, formData.verificationCode);
        if (!verifyResponse.success) {
          showErrorAlert(verifyResponse.message || 'Invalid verification code');
          return;
        }
      } catch (error) {
        showErrorAlert('Error verifying OTP');
        return;
      }

      // Submit full signup form here (send formData + files to mock registration)
      try {
        const formPayload = new FormData();
        formPayload.append('name', formData.name);
        formPayload.append('age', formData.age);
        formPayload.append('email', formData.email);
        formPayload.append('phone', formData.phone);
        formPayload.append('address', formData.address);
        formPayload.append('password', formData.password || '');

        if (formData.licenseFile) formPayload.append('license', formData.licenseFile);
        if (formData.aadharFile) formPayload.append('aadhar', formData.aadharFile);
        if (formData.rcBookFile) formPayload.append('rc', formData.rcBookFile);
        if (formData.panCardFile) formPayload.append('pan', formData.panCardFile);

        const data = await registerDriver(formPayload);
        if (data.success) {
          setAlertMessage('Registration successful! Redirecting to login...');
          setAlertVariant('success');
          setShowAlert(true);
          setTimeout(() => navigate('/login'), 2500);
        } else {
          showErrorAlert(data.message || 'Signup failed.');
        }
      } catch (error) {
        showErrorAlert('An error occurred during registration.');
      }
      return;
    }

    // Default stage increment (only for stage 1)
    setStage(stage + 1);
  };

  // Handle Back button
  const handleBack = () => {
    if (stage > 1) setStage(stage - 1);
  };

  // Handle input text change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, [`${field}File`]: file }));
    if (errors[`${field}File`]) setErrors(prev => ({ ...prev, [`${field}File`]: '' }));
  };

  // Resend OTP
  const resendOTP = () => {
    generateOTP();
    setAlertMessage('A new verification code has been sent to your email.');
    setAlertVariant('success');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 4000);
  };

  return (
    <Container fluid className="min-vh-100 d-flex align-items-stretch overflow-hidden">
      <SEO
        title="Driver Sign Up - Earn on Your Own Schedule"
        description="Register as a driver with TourGadi. Pay low commissions per trip, track your earnings in real-time, and drive on your schedule with 24/7 operator support."
        keywords="driver registration, register cab driver, tourgadi driver sign up, earn money driving, cab driver jobs"
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "TourGadi Driver App",
          "operatingSystem": "Android, iOS",
          "applicationCategory": "TravelApplication",
          "downloadUrl": "https://tourgadi.in/apps/TourGadi-Driver.apk",
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
            src="https://lottie.host/24141725-6ede-4dac-8a07-36b7201ce3cb/rfUdEigMCU.lottie"
            background="transparent"
            speed="1"
            style={{ width: '10 0%', height: 'auto' }}
            loop
            autoplay
          />
        </Col>

<Col md={6} className="p-5 d-flex flex-column justify-content-center bg-white rounded-5 shadow-sm">
  {/* Breadcrumb Navigation */}
  <div className="d-flex justify-content-center mb-3">
    <Breadcrumb items={[{ label: 'Register', path: '/signup/driver' }, { label: 'Driver' }]} />
  </div>
  {/* Animated header */}
  <div className="text-center mb-4">
    <h1 className="display-6 fw-bold mb-3" style={{ color: '#000', letterSpacing: '-0.5px' }}>
      <span className="d-inline-block" style={{ 
        borderBottom: '3px solid #000',
        paddingBottom: '5px'
      }}>
        Become a Driver
      </span>
    </h1>
    <p className="text-muted">Complete your profile in 3 easy steps</p>
  </div>

  {/* Custom progress stepper */}
<div className="stepper-container mb-5 position-relative">
  <div className="d-flex justify-content-between align-items-center position-relative">
    {[1, 2, 3].map((step) => (
      <React.Fragment key={step}>
        {/* Animated step circle */}
        <div 
          className={`step-circle ${step <= stage ? 'active' : ''}`}
          onClick={() => stage > step && setStage(step)}
          style={{
            cursor: stage > step ? 'pointer' : 'default'
          }}
        >
          <div className="step-number">{step}</div>
          {step <= stage && (
            <div className="step-check">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
          <div className="step-label">{['Personal Info', 'Documents', 'Verification'][step-1]}</div>
        </div>
        
        {/* Animated connector line */}
        {step < 3 && (
          <div className={`connector ${step < stage ? 'active' : ''}`}></div>
        )}
      </React.Fragment>
    ))}
  </div>
</div>

<style jsx>{`
  .stepper-container {
    padding: 0 20px;
  }
  
  .step-circle {
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color: #999;
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    z-index: 2;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  .step-circle.active {
    background-color: #000;
    color: white;
    transform: scale(1.1);
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
  }
  
  .step-number {
    transition: all 0.3s ease;
  }
  
  .step-circle.active .step-number {
    opacity: 0;
    transform: scale(0.5);
  }
  
  .step-check {
    position: absolute;
    opacity: 0;
    transform: scale(0.5);
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    color: white;
  }
  
  .step-circle.active .step-check {
    opacity: 1;
    transform: scale(1);
  }
  
  .step-label {
    position: absolute;
    top: 100%;
    margin-top: 12px;
    font-size: 0.8rem;
    font-weight: 500;
    color: #999;
    white-space: nowrap;
    transition: all 0.3s ease;
  }
  
  .step-circle.active .step-label {
    color: #000;
    font-weight: 600;
  }
  
  .connector {
    position: absolute;
    height: 3px;
    width: calc(50% - 50px);
    left: calc(33.33% * var(--step) - 25px);
    top: 50%;
    transform: translateY(-50%);
    background-color: #f0f0f0;
    transition: all 0.5s ease;
  }
  
  .connector.active {
    background-color: #000;
    box-shadow: 0 0 8px rgba(0,0,0,0.2);
  }
  
  .connector::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 0;
    background-color: #000;
    transition: width 0.8s ease;
  }
  
  .connector.active::after {
    width: 100%;
  }
`}</style>

  {/* Form container */}
  <Form onSubmit={handleSubmit} noValidate className="px-3">
    {stage === 1 && (
      <div className="row g-3">
        <div className="col-md-6">
          <Form.Group controlId="name">
            <Form.Label className="fw-medium text-dark">Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              placeholder="ASWIN KUMAR "
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
          <Form.Group controlId="age">
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
          <Form.Group controlId="email">
            <Form.Label className="fw-medium text-dark">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              placeholder="ae@example.com"
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
          <Form.Group controlId="phone">
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
          <Form.Group controlId="address">
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
      </div>
    )}

    {stage === 2 && (
      <div className="row g-3">
        {[
          { id: 'licenseFile', label: 'Driver License', key: 'license' },
          { id: 'aadharFile', label: 'Aadhar Card', key: 'aadhar' },
          { id: 'rcBookFile', label: 'RC Book', key: 'rcBook' },
          { id: 'panCardFile', label: 'PAN Card', key: 'panCard' }
        ].map((doc) => (
          <div className="col-md-6" key={doc.id}>
            <Form.Group controlId={doc.id}>
              <Form.Label className="fw-medium text-dark">{doc.label}</Form.Label>
              <div className="border-dark border-2 rounded-5 p-3" style={{ background: '#f8f9fa' }}>
                <Form.Control
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => handleFileChange(e, doc.key)}
                  isInvalid={!!errors[`${doc.key}File`]}
                  className="border-0 bg-transparent"
                />
                <small className="text-muted d-block mt-2">
                  <i className="bi bi-info-circle me-1"></i>
                  Supported: JPG, PNG, PDF (max 5MB)
                </small>
              </div>
              <Form.Control.Feedback type="invalid" className="fw-medium">
                <i className="bi bi-exclamation-circle me-2"></i>
                {errors[`${doc.key}File`]}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        ))}
      </div>
    )}

    {stage === 3 && (
      <div className="text-center">
        <div className="mb-4 p-4 bg-light rounded-5">
          <i className="bi bi-envelope-check fs-1 mb-3" style={{ color: '#000' }}></i>
          <h5 className="fw-bold">Verify Your Identity</h5>
          <p className="text-muted">
            We sent a 6-digit code to <span className="fw-medium">{formData.email}</span>
          </p>
        </div>

        <Form.Group controlId="verificationCode" className="mb-4">
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
                  // Auto-focus next input
                  if (e.target.value && i < 5) {
                    (document.getElementById(`digit-${i+1}`) as HTMLInputElement)?.focus();
                  }
                }}
                className="mx-1 text-center py-3 fw-bold fs-5 border-dark border-2 rounded-5"
                style={{ width: '50px', color: '#000' }}
                id={`digit-${i}`}
              />
            ))}
          </div>
          <Form.Control.Feedback type="invalid" className="fw-medium">
            <i className="bi bi-exclamation-circle me-2"></i>
            {errors.verificationCode}
          </Form.Control.Feedback>
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

    {/* Navigation buttons */}
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
    onClick={() => navigate('/')}  // Navigate to home page
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
        {stage === 3 ? 'Complete Registration' : 'Continue'}
        <i className={`bi bi-chevron-right ms-2 ${stage === 3 ? 'd-none' : ''}`}></i>
      </Button>
    </div>
  </Form>
</Col>
      </Row>
    </Container>
  );
};

export default DriverSignUp;
