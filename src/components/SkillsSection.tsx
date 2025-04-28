import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.tsx";

const programmingLanguages = [
  { name: "Java", percentage: 90, icon: "devicon-java-plain colored" },
  { name: "JavaScript", percentage: 85, icon: "devicon-javascript-plain colored" },
  { name: "Python", percentage: 80, icon: "devicon-python-plain colored" },
  { name: "PHP", percentage: 75, icon: "devicon-php-plain colored" },
  { name: "C/C++", percentage: 70, icon: "devicon-cplusplus-plain colored" }
];

const webTechnologies = [
  { name: "React", icon: "devicon-react-original colored" },
  { name: "Node.js", icon: "devicon-nodejs-plain colored" },
  { name: "Vue.js", icon: "devicon-vuejs-plain colored" },
  { name: "Angular", icon: "devicon-angularjs-plain colored" },
  { name: "HTML5", icon: "devicon-html5-plain colored" },
  { name: "CSS3", icon: "devicon-css3-plain colored" },
  { name: "Symfony", icon: "devicon-symfony-original colored" },
  { name: "Bootstrap", icon: "devicon-bootstrap-plain colored" },
  { name: "REST API", icon: "fa-solid fa-server" },
  { name: "jQuery", icon: "devicon-jquery-plain colored" }
];

const devOpsTools = [
  { name: "Git", icon: "devicon-git-plain colored" },
  { name: "Docker", icon: "devicon-docker-plain colored" },
  { name: "Jenkins", icon: "devicon-jenkins-plain colored" },
  { name: "Linux", icon: "devicon-linux-plain colored" },
  { name: "CI/CD", icon: "fa-solid fa-infinity" },
  { name: "SonarQube", icon: "fa-solid fa-code-branch" },
  { name: "Grafana", icon: "fa-solid fa-chart-line" },
  { name: "Maven", icon: "devicon-apache-plain colored" },
  { name: "Postman", icon: "devicon-chrome-plain colored" },
  { name: "VS Code", icon: "devicon-vscode-plain colored" }
];

const databases = [
  { name: "MySQL", icon: "devicon-mysql-plain colored" },
  { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
  { name: "SQLite", icon: "devicon-sqlite-plain colored" },
  { name: "NoSQL", icon: "devicon-mongodb-plain colored" }
];

const softSkills = [
  { name: "Agile/Scrum Methodology", icon: "fa-solid fa-rotate" },
  { name: "Project Management", icon: "fa-solid fa-tasks" },
  { name: "Problem Solving", icon: "fa-solid fa-puzzle-piece" },
  { name: "Team Collaboration", icon: "fa-solid fa-users" }
];

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

  const barVariants = {
    hidden: { width: 0 },
    visible: (percentage: number) => ({
      width: `${percentage}%`,
      transition: {
        duration: 1,
        ease: "easeInOut"
      }
    })
  };

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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Programming Languages */}
          <motion.div 
            className="bg-white dark:bg-dark-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100 dark:border-dark-700"
            variants={itemVariants}
          >
            <div className="text-primary-500 mb-4">
              <i className="fa-solid fa-code text-3xl"></i>
            </div>
            <h3 className="text-xl font-heading font-bold text-dark-900 dark:text-white mb-4">
              {translations.skills.sections.programming}
            </h3>
            <div className="space-y-4">
              {programmingLanguages.map((lang) => (
                <div className="skill-item" key={lang.name}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <i className={`${lang.icon} text-xl`}></i>
                      <span className="font-medium text-dark-800 dark:text-dark-100">{lang.name}</span>
                    </div>
                    <span className="text-sm text-dark-700 dark:text-dark-200">{lang.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary-500 rounded-full"
                      custom={lang.percentage}
                      variants={barVariants}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Web Technologies */}
          <motion.div 
            className="bg-white dark:bg-dark-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100 dark:border-dark-700"
            variants={itemVariants}
          >
            <div className="text-secondary-500 mb-4">
              <i className="fa-solid fa-globe text-3xl"></i>
            </div>
            <h3 className="text-xl font-heading font-bold text-dark-900 dark:text-white mb-4">
              {translations.skills.sections.web}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {webTechnologies.map((tech) => (
                <div className="skill-chip flex items-center gap-2" key={tech.name}>
                  <i className={`${tech.icon} text-xl`}></i>
                  <span className="text-dark-800 dark:text-dark-100">{tech.name}</span>
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
              {translations.skills.sections.devops}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {devOpsTools.map((tool) => (
                <div className="skill-chip flex items-center gap-2" key={tool.name}>
                  <i className={`${tool.icon} text-xl`}></i>
                  <span className="text-dark-800 dark:text-dark-100">{tool.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Databases & Soft Skills */}
          <motion.div 
            className="bg-white dark:bg-dark-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100 dark:border-dark-700"
            variants={itemVariants}
          >
            <div className="text-secondary-500 mb-4">
              <i className="fa-solid fa-database text-3xl"></i>
            </div>
            <h3 className="text-xl font-heading font-bold text-dark-900 dark:text-white mb-4">
              {translations.skills.sections.databases}
            </h3>
            {/* Databases */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-dark-700 dark:text-dark-200 mb-3">Databases</h4>
              <div className="grid grid-cols-2 gap-2">
                {databases.map((db) => (
                  <div className="skill-chip flex items-center gap-2" key={db.name}>
                    <i className={`${db.icon} text-xl`}></i>
                    <span className="text-dark-800 dark:text-dark-100">{db.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Soft Skills */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-dark-700 dark:text-dark-200 mb-3">{translations.skills.sections.softSkills}</h4>
              <div className="grid grid-cols-1 gap-2">
                {softSkills.map((skill) => (
                  <div className="skill-chip flex items-center gap-2" key={skill.name}>
                    <i className={`${skill.icon} text-xl`}></i>
                    <span className="text-dark-800 dark:text-dark-100">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
