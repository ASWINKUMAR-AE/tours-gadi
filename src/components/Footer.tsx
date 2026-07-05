import React from 'react';
import { Car, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-light text-dark dark:bg-gray-900 dark:text-gray-200 py-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="d-flex align-items-center mb-3">
              <h5 className="m-0 fw-bold">TOURS GADI</h5>
            </div>
            <p className="mb-4">Making innovations since 2026. We connect travelers with tour agents and drivers to make travel and transportation more accessible for everyone.</p>
            <div className="d-flex gap-3">
              <a href="#" className="text-dark dark:text-gray-200" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-dark dark:text-gray-200" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-dark dark:text-gray-200" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-dark dark:text-gray-200" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
         
          
          <div className="col-6 col-lg-2">
            <h6 className="fw-bold mb-3">Products</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-dark dark:text-gray-200 text-decoration-none">Ride</a></li>
        
              <li className="mb-2"><a href="#" className="text-dark dark:text-gray-200 text-decoration-none">Deliver</a></li>

            </ul>
          </div>
          
          <div className="col-6 col-lg-2">
            <h6 className="fw-bold mb-3">Travel</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-dark dark:text-gray-200 text-decoration-none">Airports</a></li>
              <li className="mb-2"><a href="#" className="text-dark dark:text-gray-200 text-decoration-none">Cities</a></li>
              <li className="mb-2"><a href="#" className="text-dark dark:text-gray-200 text-decoration-none">Stations</a></li>
              <li className="mb-2"><a href="#" className="text-dark dark:text-gray-200 text-decoration-none">Popular routes</a></li>
            </ul>
          </div>
          
          <div className="col-6 col-lg-2">
            <h6 className="fw-bold mb-3">Support</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-dark dark:text-gray-200 text-decoration-none">Help Center</a></li>
              <li className="mb-2"><a href="#" className="text-dark dark:text-gray-200 text-decoration-none">Contact Us</a></li>
              <li className="mb-2"><a href="#" className="text-dark dark:text-gray-200 text-decoration-none">Safety</a></li>
              <li className="mb-2"><a href="#" className="text-dark dark:text-gray-200 text-decoration-none">Accessibility</a></li>
            </ul>
          </div>
        </div>
        
        <hr className="my-4 border-dark dark:border-gray-700" />
        
         <div className="row">
          <div className="col-md-6 mb-3 mb-md-0">
            <p className="mb-0">© 2026 TOURS GADI. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <a href="#" className="text-dark dark:text-gray-200 text-decoration-none me-3">Privacy Policy</a>
            <a href="#" className="text-dark dark:text-gray-200 text-decoration-none">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;