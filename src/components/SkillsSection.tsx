import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.tsx";

// Catégories de compétences basées sur le CV
const languages = [
  { name: "Python"},
  { name: "SQL"},
  { name: "Java"},
  { name: "JavaScript"},
  { name: "TypeScript"},
  { name: "DataWeave"}
];

const dataAndAI = [
  { name: "Pandas"},
  { name: "NumPy"},
  { name: "Scikit-learn"},
  { name: "TensorFlow"},
  { name: "Power BI"},
  { name: "ETL"},
  { name: "Data Pipeline"}
];

const databases = [
  { name: "MySQL"},
  { name: "MongoDB"},
  { name: "PostgreSQL"},
  { name: "Firebase"}
];

const web = [
  { name: "Node.js"},
  { name: "React"},
  { name: "API REST"},
  { name: "Symfony"},
  { name: "GraphQL"}
];

const devOpsTools = [
  { name: "Docker"},
  { name: "Git"},
  { name: "GitHub"},
  { name: "Airflow"},
  { name: "Visual Studio Code"},
  { name: "Linux"},
  { name: "Maven"}
];

const softSkills = [
  { name: "Esprit d'équipe"},
  { name: "Autonomie"},
  { name: "Curiosité"},
  { name: "Rigueur"},
  { name: "Créativité"}
];

// Langues supprimées de la section Skills

const SkillsSection = () => {
  const { translations } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

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

  // Partie de pourcentage supprimée

  return (
    <section id="skills" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-dark-900 dark:text-white mb-4">{translations.skills.title}</h2>
          <div className="w-20 h-1.5 bg-primary-500 rounded-full mx-auto"></div>
          <p className="mt-4 text-dark-700 dark:text-dark-100 max-w-2xl mx-auto">
            {translations.skills.subtitle}
          </p>
        </motion.div>
        
        {/* Skills Categories */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Languages */}
          <motion.div 
            className="bg-white dark:bg-dark-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100 dark:border-dark-700"
            variants={itemVariants}
          >
            <div className="text-primary-500 mb-4">
              <i className="fa-solid fa-code text-3xl"></i>
            </div>
            <h3 className="text-xl font-heading font-bold text-dark-900 dark:text-white mb-4">
              Languages
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((lang) => (
                <div className="skill-chip" key={lang.name}>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-dark-700 text-dark-700 dark:text-dark-200 rounded-md font-medium">{lang.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Data & IA */}
          <motion.div 
            className="bg-white dark:bg-dark-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100 dark:border-dark-700"
            variants={itemVariants}
          >
            <div className="text-secondary-500 mb-4">
              <i className="fa-solid fa-chart-line text-3xl"></i>
            </div>
            <h3 className="text-xl font-heading font-bold text-dark-900 dark:text-white mb-4">
              Data & IA
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {dataAndAI.map((item) => (
                <div className="skill-chip" key={item.name}>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-dark-700 text-dark-700 dark:text-dark-200 rounded-md font-medium">{item.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
          {/* Databases */}
          <motion.div 
            className="bg-white dark:bg-dark-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100 dark:border-dark-700"
            variants={itemVariants}
          >
            <div className="text-secondary-500 mb-4">
              <i className="fa-solid fa-database text-3xl"></i>
            </div>
            <h3 className="text-xl font-heading font-bold text-dark-900 dark:text-white mb-4">
              Base de données
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {databases.map((db) => (
                <div className="skill-chip" key={db.name}>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-dark-700 text-dark-700 dark:text-dark-200 rounded-md font-medium">{db.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Web */}
          <motion.div 
            className="bg-white dark:bg-dark-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100 dark:border-dark-700"
            variants={itemVariants}
          >
            <div className="text-primary-500 mb-4">
              <i className="fa-solid fa-globe text-3xl"></i>
            </div>
            <h3 className="text-xl font-heading font-bold text-dark-900 dark:text-white mb-4">
              Web
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {web.map((item) => (
                <div className="skill-chip" key={item.name}>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-dark-700 text-dark-700 dark:text-dark-200 rounded-md font-medium">{item.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* DevOps & Tools */}
          <motion.div 
            className="bg-white dark:bg-dark-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100 dark:border-dark-700"
            variants={itemVariants}
          >
            <div className="text-primary-500 mb-4">
              <i className="fa-solid fa-gears text-3xl"></i>
            </div>
            <h3 className="text-xl font-heading font-bold text-dark-900 dark:text-white mb-4">
              Outils et Cloud
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {devOpsTools.map((tool) => (
                <div className="skill-chip" key={tool.name}>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-dark-700 text-dark-700 dark:text-dark-200 rounded-md font-medium">{tool.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Soft Skills */}
          <motion.div 
            className="bg-white dark:bg-dark-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100 dark:border-dark-700"
            variants={itemVariants}
          >
            <div className="text-primary-500 mb-4">
              <i className="fa-solid fa-users text-3xl"></i>
            </div>
            <h3 className="text-xl font-heading font-bold text-dark-900 dark:text-white mb-4">
              Soft skills
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {softSkills.map((skill) => (
                <div className="skill-chip" key={skill.name}>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-dark-700 text-dark-700 dark:text-dark-200 rounded-md font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Langues supprimées */}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
