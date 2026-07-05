import React from 'react';
import SEO from './SEO';
import Breadcrumb from './Breadcrumb';
import { DollarSign, Clock, BarChart3, MapPin, Download, Smartphone, QrCode, ArrowRight } from 'lucide-react';

const DriversSection: React.FC = () => {
  return (
    <section id="drivers" className="py-5 my-5 bg-light position-relative overflow-hidden">
      <SEO
        title="Download TourGadi Driver App - Drive & Earn Premium Income"
        description="Get the TourGadi Driver App for iOS and Android. View upfront ride fares, live map navigation, and weekly automatic payouts."
        keywords="download driver app, tourgadi driver apk, install cab driver app"
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "TourGadi Driver App",
          "operatingSystem": "Android, iOS",
          "applicationCategory": "TravelApplication",
          "downloadUrl": "https://www.wavecabs.com/uploads/APKs/TourGadi-Driver.apk",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR"
          }
        }}
      />
      {/* Animated background elements */}
      <div className="position-absolute top-0 end-0 w-100 h-100 bg-pattern opacity-10"></div>
      <div className="position-absolute bottom-0 start-0 w-100 h-100">
        <div className="animated-dots"></div>
      </div>
      
      <div className="container position-relative">
        {/* Breadcrumb Navigation */}
        <div className="mb-4">
          <Breadcrumb items={[{ label: 'Download', path: '/login' }, { label: 'Driver App' }]} />
        </div>
        <div className="row g-5 align-items-center">
          <div className="col-lg-7">
            <div className="row g-4">
              {[
                {
                  icon: <DollarSign size={24} />,
                  title: "Earn on your schedule",
                  text: "You're the boss. Drive whenever you want—no offices, no reporting to a manager.",
                  color: "bg-primary"
                },
                {
                  icon: <Clock size={24} />,
                  title: "Reliable earnings",
                  text: "Earnings are automatically deposited weekly. Track your progress and earnings in real-time.",
                  color: "bg-success"
                },
                {
                  icon: <BarChart3 size={24} />,
                  title: "Insightful stats",
                  text: "Our drivers get real time stats to help optimize their rides better and earn more, straight from the app.",
                  color: "bg-info"
                },
                {
                  icon: <MapPin size={24} />,
                  title: "Efficient routing",
                  text: "Our intelligent routing system finds you the most efficient paths to maximize your earnings.",
                  color: "bg-warning"
                }
              ].map((feature, index) => (
                <div className="col-md-6" key={index}>
                  <div className="card h-100 border-0 shadow-sm hover-scale rounderd-full position-relative">
                    <div className="card-body p-4 position-relative">
                      <div className={`${feature.color} position-absolute top-0 start-0 w-100 h-1px`} style={{ height: '4px' }}></div>
                      <div className="icon-box bg-white rounded-circle d-flex align-items-center justify-content-center mb-3" 
                        style={{ 
                          width: '50px', 
                          height: '50px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                        }}>
                        {feature.icon}
                      </div>
                      <h5 className="card-title mb-3 fw-bold">{feature.title}</h5>
                      <p className="card-text text-muted">{feature.text}</p>
                      <div className="hover-arrow">
                        <ArrowRight size={18} className="text-dark" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="col-lg-5">
            <div className="ps-lg-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-dark rounded-pill px-3 py-1 me-3">
                  <span className="text-white small fw-bold">FOR DRIVERS</span>
                </div>
                <div className="flex-grow-1 border-top border-dark"></div>
              </div>
              
              <h2 className="display-5 fw-bold mb-4">Drive With <span className="text-gradient">Us</span></h2>
              <p className="lead mb-4 text-dark">
                Join thousands of drivers earning on their own schedule with our powerful driver app.
              </p>
              
              {/* App Promotion Card */}
              <div className="card border-0 shadow-sm mb-4 bg-dark text-white overflow-hidden hover-glow">
                <div className="card-body p-4">
                  <div className="row align-items-center">
                    <div className="col-md-6 text-center mb-3 mb-md-0">
                      <div className="qr-code-container bg-white p-3 rounded-3 d-inline-block position-relative">
                        <div className="qr-placeholder" style={{
                          width: '150px',
                          height: '150px',
                          background: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '8px',
                          overflow: 'hidden'
                        }}>
                          <div className="qr-pattern"></div>
                          <QrCode size={100} color="#000" />
                          <div className="qr-logo position-absolute" style={{
                            width: '40px',
                            height: '40px',
                            background: '#000',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <span className="text-white fw-bold">DR</span>
                          </div>
                        </div>
                        <p className="text-white mt-2 mb-0 small">Scan to download app</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h5 className="fw-bold mb-3">Get the Driver App</h5>
                      <p className="small mb-4">Available for iOS and Android devices</p>
                      
                      <div className="d-flex flex-column gap-2">
                        <a href="#" className="btn btn-light rounded-pill py-2 px-3 d-flex align-items-center hover-lift">
                          <Smartphone className="me-2" size={18} />
                          <div className="text-start">
                            <small className="d-block text-muted">Download on the</small>
                            <span className="fw-bold">App Store</span>
                          </div>
                        </a>
                        
                        <a href="#" className="btn btn-light rounded-pill py-2 px-3 d-flex align-items-center hover-lift">
                          <Download className="me-2" size={18} />
                          <div className="text-start">
                            <small className="d-block text-muted">Get it on</small>
                            <span className="fw-bold">Google Play</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="d-flex flex-wrap gap-3">
                <a href="#how-it-works" className="btn btn-outline-dark rounded-pill px-4 py-3 fw-bold d-flex align-items-center hover-lift">
                  How It Works <ArrowRight size={18} className="ms-2" />
                </a>
                <a href="#driver-signup" className="btn btn-dark rounded-pill px-4 py-3 fw-bold d-flex align-items-center hover-lift">
                  Join Now <ArrowRight size={18} className="ms-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-pattern {
          background-image: radial-gradient(#00000010 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .animated-dots {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(#00000008 1px, transparent 1px);
          background-size: 15px 15px;
          animation: moveDots 60s linear infinite;
        }
        
        @keyframes moveDots {
          0% { background-position: 0 0; }
          100% { background-position: 300px 300px; }
        }
        
        .hover-scale {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hover-scale:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        
        .icon-box {
          transition: all 0.3s ease;
        }
        
        .card:hover .icon-box {
          background-color: #000 !important;
          color: white !important;
          transform: rotate(10deg) scale(1.1);
        }
        
        .hover-arrow {
          position: absolute;
          bottom: 20px;
          right: 20px;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }
        
        .card:hover .hover-arrow {
          opacity: 1;
          transform: translateX(0);
        }
        
        .qr-code-container {
          position: relative;
        }
        
        .qr-pattern {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%),
                      linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%);
          background-size: 10px 10px;
          background-position: 0 0, 5px 5px;
          opacity: 0.3;
        }
        
        .qr-logo {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        .hover-glow:hover {
          box-shadow: 0 0 20px rgba(0,0,0,0.2) !important;
        }
        
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1) !important;
        }
        
        .text-gradient {
          background: linear-gradient(90deg, #000, #555);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .bg-primary { background-color: #000 !important; }
        .bg-success { background-color: #28a745 !important; }
        .bg-info { background-color: #17a2b8 !important; }
        .bg-warning { background-color: #ffc107 !important; }
        
        @media (max-width: 992px) {
          .vertical-line {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default DriversSection;