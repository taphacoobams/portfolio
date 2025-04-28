import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext.tsx';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="w-10 h-10 rounded-full flex items-center justify-center text-dark-700 dark:text-dark-100 hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors duration-300"
      aria-label="Toggle Language"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={language}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2"
        >
          <span className="w-6 h-6 rounded-full overflow-hidden">
            <img
              src={language === 'en' ? '/flags/us.svg' : '/flags/fr.svg'}
              alt={language === 'en' ? 'English' : 'Français'}
              className="w-full h-full object-cover"
            />
          </span>
          <span className="text-sm font-medium text-dark-900 dark:text-white">
            {language === 'en' ? 'EN' : 'FR'}
          </span>
        </motion.span>
      </AnimatePresence>
    </button>
  );
};
