import React, { useEffect } from 'react';
import { MapPin, Search } from 'lucide-react';
import '@dotlottie/player-component'; // Registers <dotlottie-player> as a custom element
import AOS from 'aos';
import 'aos/dist/aos.css'; // AOS styles

const HeroSection: React.FC = () => {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });

    // Ensures <dotlottie-player> is defined (needed in some SSR/Vite setups)
    import('@dotlottie/player-component');
  }, []);

  return (
    <section className="hero-section py-20">
      <div className="container">
        <div className="row align-items-center g-20">
          {/* Text Section */}
          <div className="col-lg-6">
            <h6
              className="text-gray fw-bold"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              EXPERIENCE THE FUTURE OF TOURS & RIDES
            </h6>
            <h1
              className="display-4 fw-bold mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Premium Tour Packages & Rides at Affordable Prices
            </h1>
            <p
              className="lead mb-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              We're currently open for Maduraians only!
              Get ready to experience the best tour package and ride-hailing service in town.            </p>

            {/* Mock Search Inputs */}
            <div
              className="card shadow-sm mb-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >

            </div>

            {/* Action Buttons */}
            {/* <div 
              className="d-flex flex-wrap gap-3"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <a 
            href="/signup/customer" 
            className=""
          
          > <button className="btn btn-dark btn-lg px-4 rounded-pill">Sign up for Easly Access</button>
          </a> 
            </div> */}
          </div>

          {/* Phone Mockup with Lottie Animation */}
          <div
            className="col-lg-6 text-center"
            data-aos="zoom-out"
            data-aos-delay="600"
            data-aos-anchor-placement="top-bottom"
          >
            <div className="phone-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
              <div className="phone-screen position-relative overflow-hidden rounded-4">
                <dotlottie-player
                  src="https://lottie.host/9df8ee36-f543-49cd-a3bd-577747f4ede2/FyVSVu563O.lottie"
                  autoplay
                  loop
                  style={{ width: '100%', height: '450px', filter: 'grayscale(100%)' }}
                ></dotlottie-player>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;