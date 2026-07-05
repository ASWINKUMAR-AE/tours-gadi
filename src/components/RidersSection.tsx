import React from 'react';
import { MapPin, Clock, Shield, CreditCard } from 'lucide-react';

const RidersSection: React.FC = () => {
  return (
    <section id="riders" className="py-5 my-5">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-5">
            <div className="vertical-line position-relative">
              <div className="bg-dark" style={{ width: '4px', height: '80px', position: 'absolute', left: '0' }}></div>
              <div className="ps-4">
                <h2 className="display-6 fw-bold mb-4">For Riders</h2>
                <p className="lead mb-4">
                  We constantly experiment to come up with industry-first features for our riders that eventually become a norm.
                </p>
                <a href="#download-toursgadi-apps" className="btn btn-outline-dark rounded-pill px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" className="me-2" aria-hidden="true">
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l4-4m-4 4-4-4" />
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 21H3" />
                  </svg>
                  Download
                </a>
              </div>
            </div>
          </div>
          
          <div className="col-lg-7">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body p-4">
                    <div className="icon-box bg-light rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '50px', height: '50px' }}>
                      <MapPin className="text-dark" />
                    </div>
                    <h5 className="card-title mb-3">Request in seconds</h5>
                    <p className="card-text">Book a ride with just a few taps and get picked up by a nearby driver who'll take you to your destination.</p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body p-4">
                    <div className="icon-box bg-light rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '50px', height: '50px' }}>
                      <Clock className="text-dark" />
                    </div>
                    <h5 className="card-title mb-3">Know before you go</h5>
                    <p className="card-text">Get the information you need about your ride upfront, including price, driver details and estimated time of arrival.</p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body p-4">
                    <div className="icon-box bg-light rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '50px', height: '50px' }}>
                      <Shield className="text-dark" />
                    </div>
                    <h5 className="card-title mb-3">Safety first</h5>
                    <p className="card-text">Know your driver in advance and share your trip details with trusted contacts for extra safety during your ride.</p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body p-4">
                    <div className="icon-box bg-light rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '50px', height: '50px' }}>
                      <CreditCard className="text-dark" />
                    </div>
                    <h5 className="card-title mb-3">Multiple payment options</h5>
                    <p className="card-text">Pay for your rides using your preferred payment method—credit card, debit card, or cash in select markets.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RidersSection;
