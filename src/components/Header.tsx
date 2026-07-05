import React, { useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
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
            <span className="fw-bold">TOUR GADI</span>
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
                  href="#download-tourgadi-apps"
                  onClick={(e) => scrollToSection(e, '#download-tourgadi-apps')}
                  className="btn btn-outline-dark rounded-pill px-4"
                  aria-label="Download TourGadi apps"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" className="me-2" aria-hidden="true">
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l4-4m-4 4-4-4" />
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 21H3" />
                  </svg>
                  Download
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <style jsx>{`
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