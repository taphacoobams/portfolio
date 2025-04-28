import { motion } from 'framer-motion';

interface ObstacleProps {
  x: number;
  y: number;
  type?: number;
}

const Obstacle: React.FC<ObstacleProps> = ({ x, y, type = 0 }) => {
  // Different obstacle styles based on type
  const renderObstacle = () => {
    switch (type) {
      case 0: // Bug
        return (
          <div className="relative w-full h-full">
            {/* Bug body */}
            <div className="absolute inset-0 bg-red-500 dark:bg-red-600 rounded-full animate-pulse" />
            
            {/* Bug eyes */}
            <div className="absolute left-1/4 top-1/4 w-3 h-3 bg-white rounded-full">
              <div className="absolute right-0 top-1/2 w-1 h-1 bg-dark-900 rounded-full" />
            </div>
            <div className="absolute right-1/4 top-1/4 w-3 h-3 bg-white rounded-full">
              <div className="absolute right-0 top-1/2 w-1 h-1 bg-dark-900 rounded-full" />
            </div>
            
            {/* Bug antennas */}
            <div className="absolute -left-1 -top-2 w-1 h-3 bg-red-500 dark:bg-red-600 origin-bottom -rotate-45" />
            <div className="absolute -right-1 -top-2 w-1 h-3 bg-red-500 dark:bg-red-600 origin-bottom rotate-45" />
          </div>
        );
      
      case 1: // Spike
        return (
          <div className="relative w-full h-full">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-full">
              <div className="absolute bottom-0 left-0 w-full h-[25px] bg-gray-700 dark:bg-gray-800">
                {/* Spikes */}
                <div className="absolute -top-4 left-1/6 w-2 h-4 bg-gray-700 dark:bg-gray-800 transform rotate-0 origin-bottom" />
                <div className="absolute -top-5 left-3/6 w-2 h-5 bg-gray-700 dark:bg-gray-800 transform rotate-0 origin-bottom" />
                <div className="absolute -top-4 left-5/6 w-2 h-4 bg-gray-700 dark:bg-gray-800 transform rotate-0 origin-bottom" />
              </div>
            </div>
          </div>
        );
      
      case 2: // Flying obstacle
        return (
          <div className="relative w-full h-full">
            {/* Main body */}
            <div className="absolute inset-0 bg-purple-500 dark:bg-purple-600 rounded-lg" />
            
            {/* Wings */}
            <motion.div 
              className="absolute -left-4 top-1/4 w-4 h-2/3 bg-purple-300 dark:bg-purple-400 rounded-l-full origin-right"
              animate={{ scaleX: [1, 0.8, 1], rotate: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 0.3 }}
            />
            <motion.div 
              className="absolute -right-4 top-1/4 w-4 h-2/3 bg-purple-300 dark:bg-purple-400 rounded-r-full origin-left"
              animate={{ scaleX: [1, 0.8, 1], rotate: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 0.3 }}
            />
            
            {/* Eyes */}
            <div className="absolute left-1/4 top-1/4 w-2 h-2 bg-white rounded-full">
              <div className="absolute right-0 top-1/2 w-1 h-1 bg-dark-900 rounded-full" />
            </div>
            <div className="absolute right-1/4 top-1/4 w-2 h-2 bg-white rounded-full">
              <div className="absolute right-0 top-1/2 w-1 h-1 bg-dark-900 rounded-full" />
            </div>
          </div>
        );
      
      default:
        return (
          <div className="relative w-full h-full bg-red-500 dark:bg-red-600 rounded-full" />
        );
    }
  };
  
  // Adjust size based on obstacle type
  const getObstacleSize = () => {
    switch (type) {
      case 0: return { width: '35px', height: '35px' };
      case 1: return { width: '35px', height: '25px' };
      case 2: return { width: '35px', height: '45px' };
      default: return { width: '35px', height: '35px' };
    }
  };
  
  const size = getObstacleSize();
  
  return (
    <motion.div
      className="absolute"
      style={{ 
        left: `${x}px`,
        bottom: `${y + 40}px`, // Adding 40px to lift the obstacle above the ground level
        width: size.width,
        height: size.height
      }}
    >
      {renderObstacle()}
    </motion.div>
  );
};

export default Obstacle;