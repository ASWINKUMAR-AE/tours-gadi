import React from 'react';
import { Globe, Calendar, CreditCard, ShieldCheck } from 'lucide-react';

const TourAgentsSection: React.FC = () => {
  return (
    <section id="tour-agents" className="py-5 my-5">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-5 order-lg-2">
            <div className="vertical-line position-relative">
              <div className="bg-warning" style={{ width: '4px', height: '80px', position: 'absolute', right: '0' }}></div>
              <div className="pe-4 text-lg-end">
                <h2 className="display-6 fw-bold mb-4">For Tour Agents</h2>
                <p className="lead mb-4">
                  Partner with TourGadi to grow your agency. Easily publish customized tour packages and manage bookings.
                </p>
                <a href="#download-tourgadi-apps" className="btn btn-outline-warning rounded-pill px-4 text-dark border-dark">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" className="me-2" aria-hidden="true">
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l4-4m-4 4-4-4" />
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 21H3" />
                  </svg>
                  Download App
                </a>
              </div>
            </div>
          </div>
          
          <div className="col-lg-7 order-lg-1">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body p-4">
                    <div className="icon-box bg-light rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '50px', height: '50px' }}>
                      <Globe className="text-warning" />
                    </div>
                    <h5 className="card-title mb-3">Publish Custom Packages</h5>
                    <p className="card-text">Design detailed tour itineraries, set custom pricing, and publish them directly to travelers looking for adventure.</p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body p-4">
                    <div className="icon-box bg-light rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '50px', height: '50px' }}>
                      <Calendar className="text-warning" />
                    </div>
                    <h5 className="card-title mb-3">Easy Booking Management</h5>
                    <p className="card-text">Accept traveler booking requests, track availability, and update itineraries in real-time through the dedicated console.</p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body p-4">
                    <div className="icon-box bg-light rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '50px', height: '50px' }}>
                      <ShieldCheck className="text-warning" />
                    </div>
                    <h5 className="card-title mb-3">Verified Partners</h5>
                    <p className="card-text">Join a community of certified agencies. Enjoy trusted client relationships and dedicated agent support.</p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body p-4">
                    <div className="icon-box bg-light rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '50px', height: '50px' }}>
                      <CreditCard className="text-warning" />
                    </div>
                    <h5 className="card-title mb-3">Secure, Direct Payouts</h5>
                    <p className="card-text">Receive your funds directly and safely with multiple secure payout methods tailored for tour agencies.</p>
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

export default TourAgentsSection;
