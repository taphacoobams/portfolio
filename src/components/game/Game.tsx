import React, { useEffect, useRef, useState } from 'react';
import Player from './Player.tsx';
import Obstacle from './Obstacle.tsx';
import GameOver from './GameOver.tsx';

interface GameState {
  isPlaying: boolean;
  score: number;
  gameOver: boolean;
  obstacles: { id: number; x: number; y: number; type: number; }[];
  playerY: number;
  velocityY: number;
  isJumping: boolean;
  lastJumpTime: number;
  nextObstacleTime: number;
}

const GRAVITY = 0.5;
const JUMP_FORCE = 10;
const OBSTACLE_SPEED = 5;
const GAME_HEIGHT = 400;
const PLAYER_X = 100;
const GROUND_Y = 0;
const MAX_Y = 300; // Maximum height player can jump
const OBSTACLE_MIN_Y = 0; // Minimum height for obstacles
const OBSTACLE_MAX_Y = 250; // Maximum height for obstacles
const JUMP_COOLDOWN = 300; // Milliseconds between jumps

// Obstacle timing configuration
const MIN_OBSTACLE_INTERVAL = 700; // Minimum time between obstacles (ms)
const MAX_OBSTACLE_INTERVAL = 2000; // Maximum time between obstacles (ms)
const OBSTACLE_INTERVAL_DECREASE_RATE = 0.001; // How quickly the interval decreases with score

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    score: 0,
    gameOver: false,
    obstacles: [],
    playerY: GROUND_Y,
    velocityY: 0,
    isJumping: false,
    lastJumpTime: 0,
    nextObstacleTime: 0,
  });

  const gameLoopRef = useRef<number>();
  const lastUpdateTimeRef = useRef<number>(0);

  const startGame = () => {
    setGameState({
      isPlaying: true,
      score: 0,
      gameOver: false,
      obstacles: [],
      playerY: GROUND_Y,
      velocityY: 0,
      isJumping: false,
      lastJumpTime: 0,
      nextObstacleTime: Date.now() + getRandomObstacleInterval(0),
    });
    lastUpdateTimeRef.current = Date.now();
  };

  // Calculate a random time interval between obstacles, decreasing as score increases
  const getRandomObstacleInterval = (score: number) => {
    const minInterval = Math.max(
      MIN_OBSTACLE_INTERVAL, 
      MIN_OBSTACLE_INTERVAL + (MAX_OBSTACLE_INTERVAL - MIN_OBSTACLE_INTERVAL) * (1 - score * OBSTACLE_INTERVAL_DECREASE_RATE)
    );
    const maxInterval = Math.max(
      minInterval + 500,
      MAX_OBSTACLE_INTERVAL * (1 - score * OBSTACLE_INTERVAL_DECREASE_RATE * 0.5)
    );
    
    return Math.random() * (maxInterval - minInterval) + minInterval;
  };

  const jump = () => {
    const currentTime = Date.now();
    
    // Only allow jump if not already jumping or if jump cooldown has passed
    if (!gameState.isJumping || (currentTime - gameState.lastJumpTime > JUMP_COOLDOWN)) {
      setGameState(prev => ({
        ...prev,
        velocityY: JUMP_FORCE,
        isJumping: true,
        lastJumpTime: currentTime,
      }));
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (gameState.isPlaying) {
          jump();
        } else {
          startGame();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.isPlaying, gameState.isJumping, gameState.lastJumpTime]);

  const updateGameState = (prev: GameState): GameState => {
    const currentTime = Date.now();
    const deltaTime = currentTime - lastUpdateTimeRef.current;
    lastUpdateTimeRef.current = currentTime;
    
    // Apply gravity to velocity
    let newVelocityY = prev.velocityY - GRAVITY;
    
    // Update player position based on velocity
    let newY = prev.playerY + newVelocityY;
    
    // Check if player is on the ground
    let isJumping = prev.isJumping;
    if (newY <= GROUND_Y) {
      newY = GROUND_Y;
      newVelocityY = 0;
      isJumping = false;
    }
    
    // Check if player hit the ceiling
    if (newY >= MAX_Y) {
      newY = MAX_Y;
      newVelocityY = 0;
    }

    // Update obstacles
    const obstacles = prev.obstacles
      .map(obs => ({ ...obs, x: obs.x - OBSTACLE_SPEED * (deltaTime / 16.67) })) // Normalize for 60fps
      .filter(obs => obs.x > -50);

    // Check if it's time for a new obstacle
    let nextObstacleTime = prev.nextObstacleTime;
    if (currentTime >= prev.nextObstacleTime) {
      const randomY = Math.floor(Math.random() * (OBSTACLE_MAX_Y - OBSTACLE_MIN_Y + 1)) + OBSTACLE_MIN_Y;
      const randomType = Math.floor(Math.random() * 3); // 3 different obstacle types
      
      obstacles.push({
        id: Date.now(),
        x: window.innerWidth,
        y: randomY,
        type: randomType,
      });

      // Schedule next obstacle
      nextObstacleTime = currentTime + getRandomObstacleInterval(prev.score);
    }

    // Check collisions
    const playerRect = {
      x: PLAYER_X,
      y: GAME_HEIGHT - 40 - newY, // 40 is player height
      width: 30,
      height: 40,
    };

    const collision = obstacles.some(obs => {
      let obsHeight = 35; // Default height
      
      // Adjust hit box based on obstacle type
      if (obs.type === 1) {
        obsHeight = 25;
      } else if (obs.type === 2) {
        obsHeight = 45;
      }
      
      const obsRect = {
        x: obs.x,
        y: GAME_HEIGHT - obsHeight - obs.y,
        width: 35,
        height: obsHeight,
      };

      return (
        playerRect.x < obsRect.x + obsRect.width &&
        playerRect.x + playerRect.width > obsRect.x &&
        playerRect.y < obsRect.y + obsRect.height &&
        playerRect.y + playerRect.height > obsRect.y
      );
    });

    if (collision) {
      return { ...prev, gameOver: true, isPlaying: false };
    }

    // Increase difficulty as score increases
    const difficultyFactor = Math.min(2, 1 + (prev.score / 5000));
    const newScore = prev.score + Math.floor(1 * difficultyFactor);

    return {
      ...prev,
      playerY: newY,
      velocityY: newVelocityY,
      isJumping,
      obstacles,
      score: newScore,
      nextObstacleTime,
    };
  };

  useEffect(() => {
    if (gameState.isPlaying) {
      const gameLoop = () => {
        setGameState(updateGameState);
        gameLoopRef.current = requestAnimationFrame(gameLoop);
      };

      gameLoopRef.current = requestAnimationFrame(gameLoop);
      return () => {
        if (gameLoopRef.current) {
          cancelAnimationFrame(gameLoopRef.current);
        }
      };
    }
  }, [gameState.isPlaying]);

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-b from-primary-100 to-primary-200 dark:from-dark-800 dark:to-dark-900 rounded-lg overflow-hidden shadow-xl">
      <button 
        className="absolute inset-0 w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 bg-transparent border-0"
        onClick={() => gameState.isPlaying ? jump() : startGame()}
        onKeyDown={(e) => {
          if (e.code === 'Space' || e.code === 'Enter') {
            e.preventDefault();
            gameState.isPlaying ? jump() : startGame();
          }
        }}
      >
        <div className="absolute bottom-0 w-full h-[2px] bg-dark-300 dark:bg-dark-600" />
        
        {/* Game elements */}
        <Player y={gameState.playerY} isJumping={gameState.isJumping} />
        {gameState.obstacles.map(obstacle => (
          <Obstacle key={obstacle.id} x={obstacle.x} y={obstacle.y} type={obstacle.type} />
        ))}

        {/* Game over screen */}
        {gameState.gameOver && <GameOver score={gameState.score} />}

        {/* Start game message */}
        {!gameState.isPlaying && !gameState.gameOver && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl font-bold text-dark-900 dark:text-white">
              Press Space or Tap to Start
            </div>
          </div>
        )}

        {/* Score */}
        {gameState.isPlaying && (
          <div className="absolute top-4 right-4 text-xl font-bold text-dark-900 dark:text-white">
            Score: {gameState.score}
          </div>
        )}
      </button>
    </div>
  );
};

export default Game;