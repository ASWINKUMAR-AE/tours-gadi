import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface DarkModeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <button 
      className="btn btn-sm rounded-pill position-relative overflow-hidden" 
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      style={{ width: '40px', height: '40px' }}
    >
      <div className="toggle-icons-container position-relative" style={{ transition: 'transform 0.5s ease' }}>
        <div 
          className="position-absolute top-50 start-50 translate-middle"
          style={{ 
            transform: theme === 'light' ? 'translateY(0)' : 'translateY(-100%)',
            opacity: theme === 'light' ? 1 : 0,
            transition: 'transform 0.5s ease, opacity 0.5s ease'
          }}
        >
          <Sun size={20} />
        </div>
        <div 
          className="position-absolute top-50 start-50 translate-middle"
          style={{ 
            transform: theme === 'dark' ? 'translateY(0)' : 'translateY(100%)',
            opacity: theme === 'dark' ? 1 : 0,
            transition: 'transform 0.5s ease, opacity 0.5s ease'
          }}
        >
          <Moon size={20} />
        </div>
      </div>
    </button>
  );
};

export default DarkModeToggle;