import { motion } from "framer-motion";

const SplashScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-dark-900"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-28 h-28">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <motion.circle 
              className="text-dark-700" 
              strokeWidth="4" 
              stroke="currentColor" 
              fill="transparent" 
              r="45" 
              cx="50" 
              cy="50" 
            />
            <motion.circle 
              className="text-primary-500" 
              strokeWidth="4" 
              stroke="currentColor" 
              fill="transparent" 
              r="45" 
              cx="50" 
              cy="50" 
              strokeDasharray="283" 
              initial={{ strokeDashoffset: 283 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ 
                duration: 1.5, 
                ease: "easeInOut", 
                repeat: Infinity, 
                repeatType: "loop" 
              }}
              strokeLinecap="round" 
            />
          </svg>
          <motion.div 
            className="absolute text-white font-bold font-heading text-3xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            MS
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
