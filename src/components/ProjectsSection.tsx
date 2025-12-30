// @ts-ignore: Unreachable code error
import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.tsx";

const getProjects = (translations: any) => [
  {
    id: 1,
    title: translations.projects.items.socabeg.title,
    description: translations.projects.items.socabeg.description,
    image: "socabeg.png",
    imageAlt: "SOCABEG website screenshot",
    skills: ["React", "Tailwind CSS", "Framer Motion", "React Router", "AOS"],
    demoLink: "https://socabeg.com/",
codeLink: "https://github.com/taphacoobams/socabeg-first"
  },
  {
    id: 2,
    title: translations.projects.items.khalilCollection.title,
    description: translations.projects.items.khalilCollection.description,
    image: "khalilcollection.png",
    imageAlt: "Khalil Collection website screenshot",
    skills: ["React", "Node.js", "Express", "Tailwind CSS", "Framer Motion"],
    demoLink: "https://khalil-collection.vercel.app/",
    codeLink: "https://github.com/taphacoobams/mode-project"
  },
  {
    id: 3,
    title: translations.projects.items.aztech.title,
    description: translations.projects.items.aztech.description,
    image: "aztech.png",
    imageAlt: "AZTECH website screenshot",
    skills: ["React", "Tailwind CSS", "Framer Motion", "EmailJS"],
    demoLink: "https://aztechsn.vercel.app",
    codeLink: "https://github.com/taphacoobams/aztech"
  },
  {
    id: 4,
    title: translations.projects.items.fcom.title,
    description: translations.projects.items.fcom.description,
    image: "fcom.png",
    imageAlt: "F-COM website screenshot",
    skills: ["React", "Tailwind CSS", "Framer Motion", "React Router", "AOS"],
    demoLink: "https://f-com-website.vercel.app",
    codeLink: "https://github.com/taphacoobams/f-com_website"
  },
  {
    id: 5,
    title: translations.projects.items.faqApp.title,
    description: translations.projects.items.faqApp.description,
    image: "faq-app.jpg",
    imageAlt: "FAQ Application screenshot",
    skills: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    demoLink: "#",
    codeLink: "https://github.com/taphacoobams/faq-app"
  },
  {
    id: 6,
    title: translations.projects.items.boardGame.title,
    description: translations.projects.items.boardGame.description,
    image: "board-game.jpg",
    imageAlt: "Board Game screenshot",
    skills: ["Java", "React Native", "SQLite", "Mobile Development"],
    demoLink: "#",
    codeLink: "https://github.com/taphacoobams/board-game"
  },
  {
    id: 7,
    title: translations.projects.items.stockManager.title,
    description: translations.projects.items.stockManager.description,
    image: "stock-manager.jpg",
    imageAlt: "Stock Management Application screenshot",
    skills: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    demoLink: "#",
    codeLink: "https://github.com/taphacoobams/stock-manager"
  },
  {
    id: 8,
    title: translations.projects.items.cvManager.title,
    description: translations.projects.items.cvManager.description,
    image: "cv-manager.jpg",
    imageAlt: "CV Management Platform screenshot",
    skills: ["React", "Firebase", "MongoDB", "Node.js", "Tailwind CSS"],
    demoLink: "#",
    codeLink: "https://github.com/taphacoobams/cv-manager"
  },
  {
    id: 9,
    title: translations.projects.items.contactsManager.title,
    description: translations.projects.items.contactsManager.description,
    image: "contacts-manager.jpg",
    imageAlt: "Contacts Management Application screenshot",
    skills: ["React", "Supabase", "Django REST", "PostgreSQL", "Tailwind CSS"],
    demoLink: "#",
    codeLink: "https://github.com/taphacoobams/contacts-manager"
  },
  {
    id: 10,
    title: translations.projects.items.salesAnalytics.title,
    description: translations.projects.items.salesAnalytics.description,
    image: "sales-analytics.jpg",
    imageAlt: "Sales Analytics dashboard screenshot",
    skills: ["SQL", "Power BI", "DAX", "Data Analysis", "ETL"],
    demoLink: "#",
    codeLink: "https://github.com/taphacoobams/sales-analytics"
  },
  {
    id: 11,
    title: translations.projects.items.mlPrediction.title,
    description: translations.projects.items.mlPrediction.description,
    image: "ml-prediction.jpg",
    imageAlt: "Machine Learning Prediction screenshot",
    skills: ["Python", "Pandas", "Scikit-learn", "Machine Learning", "Data Visualization"],
    demoLink: "#",
    codeLink: "https://github.com/taphacoobams/ml-prediction"
  }
];

const ProjectsSection = () => {
  const { translations } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  // État pour la visualisation en plein écran
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  
  // Fonction pour ouvrir l'image en plein écran
  const openFullscreen = (imagePath: string) => {
    setFullscreenImage(`/images/projects/${imagePath}`);
  };
  
  // Fonction pour fermer l'image en plein écran
  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

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

  return (
    <section id="projects" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-dark-900 dark:text-white mb-4">{translations.projects.title}</h2>
          <div className="w-20 h-1.5 bg-primary-500 rounded-full mx-auto"></div>
          <p className="mt-4 text-dark-700 dark:text-dark-100 max-w-2xl mx-auto">
            {translations.projects.subtitle}
          </p>
        </motion.div>
        
        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {getProjects(translations).map((project) => (
            <motion.div 
              key={project.id}
              className="bg-white dark:bg-dark-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-dark-700 group"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-dark-700">
                {project.image ? (
                  <img 
                    src={`/images/projects/${project.image}`} 
                    alt={project.imageAlt || project.title} 
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.style.display = 'none';
                      const parent = target.parentNode as HTMLElement;
                      if (parent) {
                        const fallback = document.createElement('div');
                        fallback.className = 'absolute inset-0 flex items-center justify-center text-gray-400 dark:text-dark-600 font-heading font-bold text-2xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 dark:from-primary-500/5 dark:to-secondary-500/5';
                        fallback.textContent = project.title;
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-dark-600 font-heading font-bold text-2xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 dark:from-primary-500/5 dark:to-secondary-500/5">
                    {project.title}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <div className="flex gap-2 justify-end">
                      <button 
                        onClick={() => openFullscreen(project.image)} 
                        className="w-9 h-9 bg-white/90 dark:bg-dark-800/90 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-500 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 dark:hover:text-white transition-colors duration-300"
                        title="Voir en plein écran"
                      >
                        <i className="fa-solid fa-expand text-sm"></i>
                      </button>
                      <a href={project.demoLink} className="w-9 h-9 bg-white/90 dark:bg-dark-800/90 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-500 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 dark:hover:text-white transition-colors duration-300" title={translations.projects.liveDemo}>
                        <i className="fa-solid fa-eye text-sm"></i>
                      </a>
                      <a href={project.codeLink} className="w-9 h-9 bg-white/90 dark:bg-dark-800/90 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-500 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 dark:hover:text-white transition-colors duration-300" title={translations.projects.viewProject}>
                        <i className="fa-solid fa-code text-sm"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Project Content */}
              <div className="p-5">
                <h3 className="text-lg font-heading font-bold text-dark-900 dark:text-white mb-1">
                  {project.title}
                </h3>
                <p className="text-dark-700 dark:text-dark-200 mb-3 text-sm line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {project.skills.map((skill, i) => (
                    <span key={i} className="px-1.5 py-0.5 bg-gray-100 dark:bg-dark-700 text-dark-700 dark:text-dark-200 text-xs rounded-md">{skill}</span>
                  ))}
                </div>
                {/* Bouton En savoir plus supprimé */}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* More Projects Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a href="https://github.com/taphacoobams?tab=repositories" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-dark-800 hover:bg-gray-100 dark:hover:bg-dark-700 text-dark-800 dark:text-white border border-gray-300 dark:border-dark-700 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <i className="fa-brands fa-github"></i>
            {translations.projects.viewAllProjects}
          </a>
        </motion.div>
      </div>
      
      {/* Composant de visualisation en plein écran */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeFullscreen}
          >
            <motion.div
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <button 
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300 z-10"
                onClick={closeFullscreen}
              >
                <i className="fa-solid fa-times text-xl"></i>
              </button>
              <img 
                src={fullscreenImage} 
                alt="Project preview" 
                className="max-w-full max-h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
