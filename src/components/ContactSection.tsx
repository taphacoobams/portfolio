import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { apiRequest } from "../lib/queryClient.ts";
import { useToast } from "../hooks/use-toast.ts";
import { useLanguage } from "../i18n/LanguageContext.tsx";

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const { toast } = useToast();
  const { translations } = useLanguage();
  
  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "project", // Valeur par défaut
    message: ""
  });
  
  // Options de sujet
  const subjectOptions = [
    { value: 'project', label: 'Proposition de projet' },
    { value: 'job', label: 'Opportunité d\'emploi' },
    { value: 'collaboration', label: 'Proposition de collaboration' },
    { value: 'question', label: 'Question technique' },
    { value: 'feedback', label: 'Retour sur le portfolio' },
    { value: 'autre', label: 'Autre sujet' }
  ];
  const [isSubmitting, setIsSubmitting] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const leftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7
      }
    }
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Utiliser l'endpoint du serveur Express
      await apiRequest("POST", "http://localhost:5000/api/send-email", formData);
      toast({
        title: translations.contact.toast.success.title,
        description: translations.contact.toast.success.description,
      });
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: translations.contact.toast.error.title,
        description: translations.contact.toast.error.description,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-gray-50 dark:bg-dark-800">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-dark-900 dark:text-white mb-4">{translations.contact.title}</h2>
          <div className="w-20 h-1.5 bg-primary-500 rounded-full mx-auto"></div>
          <p className="mt-4 text-dark-700 dark:text-dark-100 max-w-2xl mx-auto">
            {translations.contact.subtitle}
          </p>
        </motion.div>
        
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-lg"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* Contact Info */}
            <motion.div 
              className="lg:w-2/5 bg-primary-600 dark:bg-primary-700 text-white p-8 lg:p-12"
              variants={leftVariants}
            >
              <h3 className="text-white font-heading font-bold mb-6">{translations.contact.info.title}</h3>
              <p className="mb-8 opacity-90">
                {translations.contact.info.description}
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">{translations.contact.info.location.title}</h4>
                    <p className="opacity-90">{translations.contact.info.location.value}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">{translations.contact.info.email.title}</h4>
                    <a href="mailto:moustaphasambe719@gmail.com" className="opacity-90 hover:opacity-100 hover:underline transition-all duration-300">
                      moustaphasambe719@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">{translations.contact.info.phone.title}</h4>
                    <a href="tel:+33758054947" className="opacity-90 hover:opacity-100 hover:underline transition-all duration-300">
                      +33 7 58 05 49 47
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Social Media Links */}
              <div className="mt-12">
                <h4 className="text-lg font-semibold mb-4">{translations.contact.info.social.title}</h4>
                <div className="flex gap-4">
                  <a href="https://github.com/taphacoobams" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/30 flex items-center justify-center transition-colors duration-300">
                    <i className="fa-brands fa-github"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/mmsambe/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/30 flex items-center justify-center transition-colors duration-300">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div 
              className="lg:w-3/5 bg-white dark:bg-dark-700 p-8 lg:p-12"
              variants={rightVariants}
            >
              <h3 className="text-2xl font-heading font-bold text-dark-900 dark:text-white mb-6">{translations.contact.form.title}</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-dark-800 dark:text-dark-100 font-medium mb-2">{translations.contact.form.name.label}</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={translations.contact.form.name.placeholder}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-dark-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-dark-800 dark:text-dark-100 font-medium mb-2">{translations.contact.form.email.label}</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={translations.contact.form.email.placeholder}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-dark-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-dark-800 dark:text-dark-100 font-medium mb-2">{translations.contact.form.subject.label}</label>
                  <select 
                    id="subject" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-dark-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    required
                  >
                    {subjectOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-dark-800 dark:text-dark-100 font-medium mb-2">{translations.contact.form.message.label}</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    rows={5} 
                    placeholder={translations.contact.form.message.placeholder}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-dark-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <button 
                    type="submit" 
                    className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {translations.contact.form.submit.sending}
                      </span>
                    ) : translations.contact.form.submit.label}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
