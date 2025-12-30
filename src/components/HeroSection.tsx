import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.tsx";

const HeroSection = () => {
  const { translations } = useLanguage();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const roles = translations.hero.roles;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section id="hero" className="min-h-screen pt-28 pb-16 flex flex-col justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-white dark:from-dark-700/20 dark:to-dark-900 z-0"></div>
      
      {/* Grid Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgZmlsbD0iIzIxMjEyMSIgZmlsbC1vcGFjaXR5PSIwLjAzIj4KICAgICAgICAgICAgPHBhdGggZD0iTTM2IDM0djI2aDI0di0yNkgzNnpNMCAzNHYyNmgyNHYtMjZIMHoiLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==')]"></div>
      </div>
      
      {/* Animated Elements */}
      <motion.div 
        className="absolute -bottom-10 -right-32 lg:-bottom-24 lg:-right-24 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/5 rounded-full filter blur-3xl z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      ></motion.div>
      <motion.div 
        className="absolute -top-32 -left-32 w-64 h-64 bg-secondary-500/10 dark:bg-secondary-500/5 rounded-full filter blur-3xl z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      ></motion.div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl">
          <div className="space-y-8">
            {/* Greeting */}
            <motion.p 
              className="text-lg md:text-xl font-medium text-primary-600 dark:text-primary-500"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block relative">
                {translations.hero.greeting}
                <span className="absolute bottom-0 left-0 w-full h-1 bg-primary-500/50 dark:bg-primary-500/30"></span>
              </span>
            </motion.p>
            
            {/* Name */}
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-dark-900 dark:text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Moustapha Sambe
            </motion.h1>
            
            {/* Animated Tagline */}
            <motion.div 
              className="h-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-2xl md:text-3xl font-semibold text-dark-800 dark:text-dark-100 overflow-hidden">
                <motion.div
                  key={currentRoleIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {roles[currentRoleIndex]}
                </motion.div>
              </div>
            </motion.div>
            
            {/* Description */}
            <motion.p 
              className="text-lg text-dark-700 dark:text-dark-100 max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {translations.hero.description}
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <a href="#contact" className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                <i className="fa-solid fa-envelope"></i>
                {translations.hero.cta}
              </a>
              <a href="#projects" className="px-6 py-3 bg-white dark:bg-dark-800 hover:bg-gray-100 dark:hover:bg-dark-700 text-dark-800 dark:text-white border border-gray-300 dark:border-dark-700 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                <i className="fa-solid fa-code"></i>
                {translations.hero.viewProjects}
              </a>
            </motion.div>
            
            {/* Social Links */}
            <motion.div 
              className="flex items-center gap-4 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <a href="https://github.com/taphacoobams" target="_blank" rel="noopener noreferrer" className="text-dark-700 dark:text-dark-100 hover:text-primary-600 dark:hover:text-primary-500 transition-colors duration-300">
                <i className="fa-brands fa-github text-2xl"></i>
              </a>
              <a href="https://www.linkedin.com/in/mmsambe/" target="_blank" rel="noopener noreferrer" className="text-dark-700 dark:text-dark-100 hover:text-primary-600 dark:hover:text-primary-500 transition-colors duration-300">
                <i className="fa-brands fa-linkedin text-2xl"></i>
              </a>
              <a href="mailto:moustaphasambe719@gmail.com" className="text-dark-700 dark:text-dark-100 hover:text-primary-600 dark:hover:text-primary-500 transition-colors duration-300">
                <i className="fa-solid fa-envelope text-2xl"></i>
              </a>
              <a href="tel:+33753848157" className="text-dark-700 dark:text-dark-100 hover:text-primary-600 dark:hover:text-primary-500 transition-colors duration-300">
                <i className="fa-solid fa-phone text-2xl"></i>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: 1.2,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5
        }}
      >
        <a href="#about" className="flex flex-col items-center text-dark-700 dark:text-dark-100 hover:text-primary-600 dark:hover:text-primary-500 transition-colors duration-300">
          <span className="text-sm mb-2">{translations.hero.scrollDown}</span>
          <i className="fa-solid fa-chevron-down"></i>
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
