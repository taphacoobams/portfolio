import { motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext.tsx';

interface GameOverProps {
  score: number;
}

const GameOver: React.FC<GameOverProps> = ({ score }) => {
  const { translations } = useLanguage();

  // Calculate unlocked items based on score
  const unlockedSkills = [
    { score: 100, name: 'React' },
    { score: 200, name: 'Node.js' },
    { score: 300, name: 'TypeScript' },
    { score: 400, name: 'Vue.js' },
    { score: 500, name: 'MongoDB' },
  ].filter(skill => score >= skill.score);

  const unlockedProjects = [
    { score: 150, name: 'SYAGES', link: '#projects' },
    { score: 250, name: 'Portfolio', link: '#projects' },
    { score: 350, name: 'E-commerce App', link: '#projects' },
  ].filter(project => score >= project.score);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div className="bg-white dark:bg-dark-800 p-8 rounded-xl shadow-xl max-w-md w-full mx-4">
        <h2 className="text-3xl font-bold text-dark-900 dark:text-white mb-4">
          {translations.game.gameOver}
        </h2>
        
        <p className="text-xl text-dark-600 dark:text-dark-200 mb-6">
          {translations.game.finalScore}: {score}
        </p>

        {unlockedSkills.length > 0 && (
          <div className="mb-6">
            <h3 className="font-bold text-dark-900 dark:text-white mb-2">
              {translations.game.unlockedSkills}:
            </h3>
            <div className="flex flex-wrap gap-2">
              {unlockedSkills.map(skill => (
                <motion.span
                  key={skill.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        {unlockedProjects.length > 0 && (
          <div className="mb-6">
            <h3 className="font-bold text-dark-900 dark:text-white mb-2">
              {translations.game.unlockedProjects}:
            </h3>
            <div className="flex flex-wrap gap-2">
              {unlockedProjects.map(project => (
                <motion.a
                  key={project.name}
                  href={project.link}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block px-3 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 rounded-full text-sm hover:bg-secondary-200 dark:hover:bg-secondary-800 transition-colors"
                >
                  {project.name}
                </motion.a>
              ))}
            </div>
          </div>
        )}

        <div className="text-center text-dark-600 dark:text-dark-200 mt-4">
          Press Space to Play Again
        </div>
      </div>
    </motion.div>
  );
};

export default GameOver;
