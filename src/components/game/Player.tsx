import { motion } from 'framer-motion';

interface PlayerProps {
  y: number;
  isJumping: boolean;
}

const Player = ({ y, isJumping }: PlayerProps) => {
  return (
    <motion.div
      className="absolute left-[50px] w-[30px] h-[40px] flex items-center justify-center"
      style={{
        bottom: `${y}px`,
      }}
      animate={{
        rotate: isJumping ? [-5, 0, 5] : 0,
        scale: isJumping ? 1.1 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-full h-full">
        {/* Head */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4/5 h-1/3 bg-yellow-200 dark:bg-yellow-300 rounded-full" />
        
        {/* Body */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-3/5 h-1/3 bg-blue-500 dark:bg-blue-600 rounded-sm" />
        
        {/* Legs */}
        <div className="absolute bottom-0 left-1/4 w-1/5 h-1/3 bg-gray-700 dark:bg-gray-800 rounded-sm" />
        <div className="absolute bottom-0 right-1/4 w-1/5 h-1/3 bg-gray-700 dark:bg-gray-800 rounded-sm" />
        
        {/* Arms */}
        <motion.div 
          className="absolute top-1/3 left-0 w-1/5 h-1/4 bg-blue-500 dark:bg-blue-600 rounded-sm"
          animate={{
            rotate: isJumping ? [-30, -45] : 0,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.div 
          className="absolute top-1/3 right-0 w-1/5 h-1/4 bg-blue-500 dark:bg-blue-600 rounded-sm"
          animate={{
            rotate: isJumping ? [30, 45] : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Face */}
        <div className="absolute top-[15%] left-1/2 transform -translate-x-1/2 w-3/5 h-1/5">
          {/* Eyes */}
          <div className="absolute left-1/4 top-1/2 w-1 h-1 bg-dark-900 rounded-full" />
          <div className="absolute right-1/4 top-1/2 w-1 h-1 bg-dark-900 rounded-full" />
          
          {/* Smile */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/5 h-[2px] bg-dark-900 rounded-full" />
        </div>
      </div>
    </motion.div>
  );
};

export default Player;