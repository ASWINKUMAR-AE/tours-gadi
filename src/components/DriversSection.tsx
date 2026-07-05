import React from 'react';
import { DollarSign, Clock, BarChart3, MapPin } from 'lucide-react';

const DriversSection: React.FC = () => {
  return (
    <section id="drivers" className="py-5 my-5 bg-light">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-7">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body p-4">
                    <div className="icon-box bg-white rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '50px', height: '50px' }}>
                      <DollarSign className="text-dark" />
                    </div>
                    <h5 className="card-title mb-3">Earn on your schedule</h5>
                    <p className="card-text">You're the boss. Drive whenever you want—no offices, no reporting to a manager.</p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body p-4">
                    <div className="icon-box bg-white rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '50px', height: '50px' }}>
                      <Clock className="text-dark" />
                    </div>
                    <h5 className="card-title mb-3">Reliable earnings</h5>
                    <p className="card-text">Earnings are automatically deposited weekly. Track your progress and earnings in real-time.</p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body p-4">
                    <div className="icon-box bg-white rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '50px', height: '50px' }}>
                      <BarChart3 className="text-dark" />
                    </div>
                    <h5 className="card-title mb-3">Insightful stats</h5>
                    <p className="card-text">Our drivers get real time stats to help optimize their rides better and earn more, straight from the app.</p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body p-4">
                    <div className="icon-box bg-white rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '50px', height: '50px' }}>
                      <MapPin className="text-dark" />
                    </div>
                    <h5 className="card-title mb-3">Efficient routing</h5>
                    <p className="card-text">Our intelligent routing system finds you the most efficient paths to maximize your earnings.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-5">
            <div className="vertical-line position-relative">
              <div className="bg-dark" style={{ width: '4px', height: '80px', position: 'absolute', right: '0' }}></div>
              <div className="pe-4 text-lg-end">
                <h2 className="display-6 fw-bold mb-4">For Drivers</h2>
                <p className="lead mb-4">
                  Our drivers get real time stats to help optimize their rides better and earn more, straight from the app.
                </p>
                <a href="#download-tourgadi-apps" className="btn btn-outline-dark rounded-pill px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" className="me-2" aria-hidden="true">
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l4-4m-4 4-4-4" />
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 21H3" />
                  </svg>
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DriversSection;
