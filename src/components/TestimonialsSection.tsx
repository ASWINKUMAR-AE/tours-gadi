import React from 'react';
import { Star } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  return (
    <section className="testimonials-section py-5 my-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold mb-3">What Our Users Say</h2>
          <p className="lead text-muted">Trusted by millions of users worldwide</p>
        </div>

        <div className="row g-4">
          {[
            {
              name: "Sarah Johnson",
              role: "Regular Rider",
              image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              text: "RideNow has transformed my daily commute. The app is incredibly user-friendly, and the drivers are always professional."
            },
            {
              name: "Michael Chen",
              role: "Business Traveler",
              image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              text: "As someone who travels frequently for business, RideNow has become my go-to choice. Reliable service and competitive prices."
            },
            {
              name: "Emily Rodriguez",
              role: "Part-time Driver",
              image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              text: "Driving with RideNow has provided me with a flexible way to earn extra income. The platform is easy to use and support is great."
            }
          ].map((testimonial, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm testimonial-card">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="rounded-circle me-3"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                    <div>
                      <h5 className="mb-1">{testimonial.name}</h5>
                      <p className="text-muted mb-0">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="card-text mb-4">{testimonial.text}</p>
                  <div className="text-warning">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
