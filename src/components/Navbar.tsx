import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.tsx";
import { LanguageSwitcher } from "./ui/LanguageSwitcher.tsx";

import { Logo } from "./ui/logo.tsx";

const Navbar = () => {
  const { translations } = useLanguage();

  const navLinks = [
    { href: "#about", label: translations.nav.about },
    { href: "#skills", label: translations.nav.skills },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: translations.nav.projects },
    { href: "#education", label: "Education" },
    { href: "#contact", label: translations.nav.contact }
  ];
  // Get theme from localStorage or system preference rather than context
  const [theme, setTheme] = useState(() => {
    // Default to light theme if we can't determine the preference
    if (typeof window === 'undefined') return 'light';
    
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    return (savedTheme === "dark" || (!savedTheme && prefersDark)) ? "dark" : "light";
  });
  
  // Manual toggle function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Update DOM
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save to localStorage
    localStorage.setItem('theme', newTheme);
  };
  
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 py-4 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-dark-900/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className="nav-link text-dark-700 dark:text-dark-100 hover:text-primary-600 dark:hover:text-primary-500 font-medium transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          {/* Theme Toggle + Mobile Menu Button */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center text-dark-700 dark:text-dark-100 hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors duration-300" 
              aria-label="Toggle Dark Mode"
            >
              <i className={`fa-solid ${theme === 'dark' ? 'fa-moon' : 'fa-sun'}`}></i>
            </button>
            <LanguageSwitcher />
            
            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-dark-700 dark:text-dark-100 hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors duration-300" 
              aria-label="Toggle Menu"
            >
              <i className={`fa-solid ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div 
            className="md:hidden mt-4 rounded-lg bg-white dark:bg-dark-800 p-4 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="mobile-nav-link py-2 px-4 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-md transition-colors duration-300"
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
