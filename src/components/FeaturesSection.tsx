import React from 'react';
import { Smartphone, Shield, Clock, CreditCard, MapPin, Bell } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  return (
    <section className="features-section py-5 my-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold mb-3">Why Choose TourGadi</h2>
          <p className="lead text-muted">Experience the future of travel packages and urban mobility with our innovative features</p>
        </div>
        
        <div className="row g-4">
          {[
            {
              icon: <Smartphone className="text-success" />,
              title: "Easy Booking",
              description: "Book your tours and rides with just a few taps on our smartphone app"
            },
            {
              icon: <Shield className="text-success" />,
              title: "Safe Travel",
              description: "All our tour agents and drivers are verified and trips are monitored"
            },
            {
              icon: <Clock className="text-success" />,
              title: "24/7 Support",
              description: "Available round the clock for all your booking queries and travel needs"
            },
            {
              icon: <CreditCard className="text-success" />,
              title: "Secure Payments",
              description: "Multiple secure payment options for packages and ride services"
            },
            {
              icon: <MapPin className="text-success" />,
              title: "Live Tracking",
              description: "Track your tour vehicles and driver rides in real-time"
            },
            {
              icon: <Bell className="text-success" />,
              title: "Instant Notifications",
              description: "Get updates about your booking status and itinerary changes instantly"
            }
          ].map((feature, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm feature-card">
                <div className="card-body p-4">
                  <div className="feature-icon-wrapper mb-4">
                    <div className="feature-icon-bg rounded-circle d-flex align-items-center justify-content-center">
                      {feature.icon}
                    </div>
                  </div>
                  <h5 className="card-title mb-3">{feature.title}</h5>
                  <p className="card-text text-muted">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
