import { useLanguage } from "../i18n/LanguageContext.tsx";

const Footer = () => {
  const { translations } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo & Tagline */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 font-heading font-bold text-xl text-white mb-2">
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/30 flex items-center justify-center transition-colors duration-300">
                MS
              </a>
              <span>Moustapha Sambe</span>
            </div>
            <p className="text-gray-400 max-w-md">
              {translations.footer.tagline}
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-6 md:mb-0">
            <div>
              <h4 className="font-heading font-bold text-white mb-4">{translations.footer.legal.title}</h4>
              <ul className="space-y-2">
                <li><a href="/privacy" className="text-gray-400 hover:text-primary-500 transition-colors duration-300">{translations.footer.legal.privacy}</a></li>
                <li><a href="/terms" className="text-gray-400 hover:text-primary-500 transition-colors duration-300">{translations.footer.legal.terms}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold text-white mb-4">{translations.footer.navigation.title}</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-primary-500 transition-colors duration-300">{translations.footer.navigation.home}</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-primary-500 transition-colors duration-300">{translations.footer.navigation.about}</a></li>
                <li><a href="#skills" className="text-gray-400 hover:text-primary-500 transition-colors duration-300">{translations.footer.navigation.skills}</a></li>
                <li><a href="#projects" className="text-gray-400 hover:text-primary-500 transition-colors duration-300">{translations.footer.navigation.projects}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold text-white mb-4">{translations.footer.contact.title}</h4>
              <ul className="space-y-2">
                <li><a href="mailto:moustaphasambe719@gmail.com" className="text-gray-400 hover:text-primary-500 transition-colors duration-300">{translations.footer.contact.email}</a></li>
                <li><a href="https://www.linkedin.com/in/mmsambe/" target="_blank" className="text-gray-400 hover:text-primary-500 transition-colors duration-300">LinkedIn</a></li>
                <li><a href="https://github.com/taphacoobams" target="_blank" className="text-gray-400 hover:text-primary-500 transition-colors duration-300">GitHub</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-dark-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} {translations.footer.copyright}
          </p>
          
          <div className="flex items-center space-x-4">
            <a href="https://github.com/taphacoobams" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
              <i className="fa-brands fa-github text-xl"></i>
            </a>
            <a href="https://www.linkedin.com/in/mmsambe/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
              <i className="fa-brands fa-linkedin text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
