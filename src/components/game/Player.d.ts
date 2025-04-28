import { FC } from 'react';

interface PlayerProps {
  y: number;
  isJumping: boolean;
}

declare const Player: FC<PlayerProps>;

export default Player;
