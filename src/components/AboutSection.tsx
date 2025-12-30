import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.tsx";

const AboutSection = () => {
  const { translations } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const leftSideVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
      },
    },
  };

  const rightSideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
      },
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 bg-gray-50 dark:bg-dark-800"
    >
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="flex flex-col lg:flex-row gap-12 items-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Image Side */}
          <motion.div
            className="lg:w-5/12 relative"
            variants={leftSideVariants}
          >
            <div className="relative">
              {/* Main Image Frame */}
              <div className="w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden border-8 border-white dark:border-dark-700 shadow-lg relative z-10 bg-gradient-to-br from-primary-50 to-gray-100 dark:from-dark-700 dark:to-dark-800 flex items-center justify-center">
                {/* Profile Icon */}
                <i className="fa-solid fa-user-circle text-[12rem] text-primary-500/70 dark:text-primary-500/50"></i>
              </div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 bg-primary-500/20 rounded-full blur-md"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.8, delay: 0.3 }}
              ></motion.div>
              <motion.div
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary-500/20 rounded-full blur-md"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.8, delay: 0.5 }}
              ></motion.div>

              {/* Experience Badge */}
              <motion.div
                className="absolute -bottom-5 -right-5 md:bottom-4 md:right-2 bg-white dark:bg-dark-900 rounded-full p-4 shadow-lg z-20 transform rotate-6"
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1, rotate: 6 }
                    : { opacity: 0, scale: 0 }
                }
                transition={{ duration: 0.5, delay: 0.7, type: "spring" }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary-500 flex flex-col items-center justify-center text-white">
                  <span className="text-lg md:text-xl font-bold">3+</span>
                  <span className="text-xs md:text-sm">
                    {translations.about.yearsExperience}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div className="lg:w-7/12" variants={rightSideVariants}>
            {/* Section Title */}
            <motion.div className="mb-8" variants={itemVariants}>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-dark-900 dark:text-white mb-4">
                {translations.about.title}
              </h2>
              <div className="w-20 h-1.5 bg-primary-500 rounded-full"></div>
            </motion.div>

            {/* Bio */}
            <div className="space-y-6 text-dark-700 dark:text-dark-100">
              <motion.p className="text-lg" variants={itemVariants}>
                {translations.about.passionate}
              </motion.p>

              <motion.p variants={itemVariants}>
                {translations.about.currentStudy}
              </motion.p>

              <motion.p variants={itemVariants}>
                {translations.about.hobbies}
              </motion.p>

              {/* Personal Information */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3"
                variants={itemVariants}
              >
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-map-marker-alt text-primary-500 text-lg w-5"></i>
                  <span>Paris, France</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-phone text-primary-500 text-lg w-5"></i>
                  <span>+33 7 53 84 81 57</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-envelope text-primary-500 text-lg w-5"></i>
                  <span>moustaphasambe719@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-globe text-primary-500 text-lg w-5"></i>
                  <span>
                    <span className="font-medium mr-1">
                      {translations.about.languages}:
                    </span>
                    {translations.about.languageNames}
                  </span>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div className="pt-4" variants={itemVariants}>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-dark-700 hover:bg-gray-100 dark:hover:bg-dark-600 text-dark-800 dark:text-white border border-gray-300 dark:border-dark-600 font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <i className="fa-solid fa-download"></i>
                  {translations.about.downloadCV}
                </a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
