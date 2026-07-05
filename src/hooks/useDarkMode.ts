import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export const useDarkMode = (): [Theme, () => void] => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem('theme');
    // Always default to light theme
    return (savedTheme as Theme) || 'light';
  });

  // Apply theme changes to document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.setAttribute('data-bs-theme', 'dark');
      document.body.classList.add('dark-mode');
    } else {
      root.setAttribute('data-bs-theme', 'light');
      document.body.classList.remove('dark-mode');
    }
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return [theme, toggleTheme];
};