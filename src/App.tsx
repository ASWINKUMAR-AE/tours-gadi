import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Header from './components/Header';
import Footer from './components/Footer';
import DriverSignUp from './components/Driver_sign_up';
import Customer_reg from './components/Customer_reg';
import HeroSection from './components/HeroSection';
import RidersSection from './components/RidersSection';
import DriversSection from './components/DriversSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import StatsSection from './components/StatsSection';
import App_code from './components/App_code';
import Customer_app from './components/Customer_app';
import TourAgentsSection from './components/TourAgentsSection';
import { useDarkMode } from './hooks/useDarkMode';
import AppDownloadSection from './components/AppDownloadSection';
import EarbudShowcase from "./components/spatial-product-showcase";

// ✅ HomePage component that contains all homepage sections
function HomePage() {
  return (
    <>
      <HeroSection
        data-aos="fade-in"
        data-aos-delay="50"
        data-aos-duration="1000"
      />
      <RidersSection
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-duration="800"
      />
      <DriversSection
        data-aos="fade-up"
        data-aos-delay="150"
        data-aos-duration="800"
      />
      <TourAgentsSection
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="800"
      />
      <FeaturesSection
        data-aos="zoom-out"
        data-aos-anchor-placement="top-center"
        data-aos-delay="200"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
      />
      <StatsSection
        data-aos="fade-up"
        data-aos-delay="250"
        data-aos-duration="800"
      />
      {/* <TestimonialsSection 
        data-aos="fade-up"
        data-aos-delay="300"
        data-aos-duration="800"
      /> */}

      <AppDownloadSection
        data-aos="fade-up"
        data-aos-delay="350"
        data-aos-duration="800"
      />

      <EarbudShowcase
        data-aos="fade-up"
        data-aos-delay="350"
        data-aos-duration="800"
      />

    </>
  );
}

function App() {
  const [theme, toggleTheme] = useDarkMode();
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 120,
      easing: 'ease-in-out',
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [location]);

  // Hide Header and Footer on specific routes
  const hideLayout = location.pathname === "/signup/driver" || location.pathname === "/signup/customer";

  return (
    <div className="app-container">
      {!hideLayout && <Header theme={theme} toggleTheme={toggleTheme} />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup/driver" element={<DriverSignUp />} />
          <Route path="/login" element={<App_code />} />
          <Route path='/customer_app' element={<Customer_app />} />
          <Route path="/signup/customer" element={<Customer_reg />} />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;