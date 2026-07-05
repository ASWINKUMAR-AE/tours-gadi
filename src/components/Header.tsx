import React, { useEffect } from 'react';
import { Car, Menu, X } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showSignUpModal, setShowSignUpModal] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignUpClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowSignUpModal(true);
    setIsMenuOpen(false);
  };

  const closeModal = () => {
    setShowSignUpModal(false);
  };

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`sticky-top ${scrolled ? 'shadow-sm' : ''}`}>
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img src="/images/logo.png" alt="WAVE CABS" className="me-2" width={24} />
            <span className="fw-bold">TOURS GADI</span>
          </a>

          <div className="d-flex align-items-center">
            <DarkModeToggle theme={theme} toggleTheme={toggleTheme} />

            <button
              className="navbar-toggler ms-2 border-0"
              type="button"
              onClick={toggleMenu}
              aria-controls="navbarNav"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#riders"
                  onClick={(e) => scrollToSection(e, '#riders')}
                  style={{
                    transition: 'color 0.2s ease-in-out',
                    fontWeight: 500
                  }}
                >
                  For Riders
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#drivers"
                  onClick={(e) => scrollToSection(e, '#drivers')}
                  style={{
                    transition: 'color 0.2s ease-in-out',
                    fontWeight: 500
                  }}
                >
                  For Drivers
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#tour-agents"
                  onClick={(e) => scrollToSection(e, '#tour-agents')}
                  style={{
                    transition: 'color 0.2s ease-in-out',
                    fontWeight: 500
                  }}
                >
                  For Tour Agents
                </a>
              </li>

              <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                <a
                  href="#download-toursgadi-apps"
                  onClick={(e) => scrollToSection(e, '#download-toursgadi-apps')}
                  className="btn btn-outline-dark rounded-pill px-4"
                  aria-label="Download ToursGadi apps"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" className="me-2" aria-hidden="true">
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l4-4m-4 4-4-4" />
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 21H3" />
                  </svg>
                  Download
                </a>
              </li>

              <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                <a
                  className="btn btn-dark px-4 rounded-pill"
                  href="#signup"
                  onClick={handleSignUpClick}
                  style={{
                    transition: 'all 0.2s ease-in-out',
                    transform: 'translateY(0)'
                  }}
                >
                  Sign Up
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Sign Up Modal */}
      {showSignUpModal && (
        <div className={`modal fade show ${theme === 'light' ? 'light-theme' : 'dark-theme'}`} style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              animation: 'modalAppear 0.3s ease-out forwards'
            }}>
              <div className="modal-header" style={{
                borderBottom: '1px solid #f0f0f0',
                backgroundColor: theme === 'light' ? '#ffffff' : '#212529'
              }}>
                <h5 className="modal-title" style={{
                  color: theme === 'light' ? '#000000' : '#ffffff',
                  fontWeight: '600'
                }}>Sign Up As</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                  style={{
                    filter: theme === 'light' ? 'invert(0%)' : 'invert(100%)'
                  }}
                ></button>
              </div>
              <div className="modal-body d-flex flex-column gap-3" style={{
                padding: '24px',
                backgroundColor: theme === 'light' ? '#ffffff' : '#212529'
              }}>
                <a
                  href="/signup/driver"
                  className="btn btn-dark py-3 d-flex align-items-center justify-content-center gap-2"
                  style={{
                    backgroundColor: theme === 'light' ? '#f8f9fa' : '#343a40',
                    color: theme === 'light' ? '#000000' : '#ffffff',
                    border: theme === 'light' ? '1px solid #e0e0e0' : '1px solid #495057',
                    borderRadius: '8px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease',
                    transform: 'translateY(0)'
                  }}
                >
                  <Car size={20} />
                  <span>Driver</span>
                </a>
                <a
                  href="/signup/customer"
                  className="btn btn-dark py-3 d-flex align-items-center justify-content-center gap-2"
                  style={{
                    backgroundColor: theme === 'light' ? '#f8f9fa' : '#343a40',
                    color: theme === 'light' ? '#000000' : '#ffffff',
                    border: theme === 'light' ? '1px solid #e0e0e0' : '1px solid #495057',
                    borderRadius: '8px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease',
                    transform: 'translateY(0)'
                  }}
                >
                  <span>Customer</span>
                </a>
              </div>
              <div className="modal-footer" style={{
                borderTop: '1px solid #f0f0f0',
                backgroundColor: theme === 'light' ? '#ffffff' : '#212529',
                borderRadius: '0 0 12px 12px'
              }}>
                {/* <p className="small mb-0" style={{
                  color: theme === 'light' ? '#666666' : '#adb5bd'
                }}>
                  Already have an account? <a href="/login" style={{
                    color: theme === 'light' ? '#000000' : '#ffffff',
                    fontWeight: '500',
                    textDecoration: 'none',
                    ':hover': {
                      textDecoration: 'underline'
                    }
                  }}>Log in</a>
                </p> */}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes modalAppear {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .nav-link:hover {
          color: ${theme === 'light' ? '#000000' : '#ffffff'} !important;
          transform: translateY(-2px);
        }
        
        .navbar {
          transition: all 0.3s ease-in-out;
          
        }
      `}</style>
    </header>
  );
};

export default Header;