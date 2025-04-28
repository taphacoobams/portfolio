import { FC } from 'react';

interface ObstacleProps {
  x: number;
  y: number;
  type?: number;
}

declare const Obstacle: FC<ObstacleProps>;

export default Obstacle;