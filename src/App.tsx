import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SEO from './components/SEO';
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
import FAQSection from './components/FAQSection';

// ✅ HomePage component that contains all homepage sections
function HomePage() {
  return (
    <>
      <SEO
        title="TourGadi | Premium Tour Packages & Rides in Madurai"
        description="Book verified tour packages, local cabs, and round trips at the best rates in Madurai. TourGadi connects travelers with certified tour operators and reliable local drivers."
        keywords="tour package, cab booking madurai, tourgadi, local ride hailing, verified driver cabs, custom tour itinerary, tour agent madurai"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "TourGadi",
            "url": "https://tourgadi.in",
            "logo": "https://tourgadi.in/images/logo.png",
            "sameAs": [
              "https://www.facebook.com/tourgadi",
              "https://twitter.com/tourgadi",
              "https://www.instagram.com/tourgadi"
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "TourGadi",
            "url": "https://tourgadi.in",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://tourgadi.in/?search={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "TourGadi",
            "image": "https://tourgadi.in/images/logo.png",
            "telephone": "+919876543210",
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "KK Nagar",
              "addressLocality": "Madurai",
              "addressRegion": "Tamil Nadu",
              "postalCode": "625020",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 9.9252,
              "longitude": 78.1198
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
              ],
              "opens": "00:00",
              "closes": "23:59"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is TourGadi?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "TourGadi is a premium tour packages and ride-hailing booking platform operating in Madurai. It connects travelers directly with certified local drivers and tour operators."
                }
              },
              {
                "@type": "Question",
                "name": "How can I book a tour package with TourGadi?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can book custom packages using the TourGadi User App, or view itineraries directly on the website and coordinate with certified tour agents."
                }
              },
              {
                "@type": "Question",
                "name": "What are the fees for drivers?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "TourGadi offers a simple commission-per-ride model for drivers. There are no subscription fees, platform fees, or hidden deductions."
                }
              }
            ]
          }
        ]}
      />
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
      <FAQSection />

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