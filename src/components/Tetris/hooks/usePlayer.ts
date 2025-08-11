// src/components/Tetris/hooks/usePlayer.ts
import { useCallback, useState } from 'react';
import { randomTetromino } from '../../tetrominos';
import { STAGE_WIDTH } from '../../gameHelper';

export default function usePlayer() {
    const [player, setPlayer] = useState(() => {
        const { shape } = randomTetromino();
        return {
            pos: { x: Math.floor(STAGE_WIDTH / 2) - 2, y: 0 },
            tetromino: shape,
            collided: false,
        };
    });

    const resetPlayer = useCallback(() => {
        const { shape } = randomTetromino();
        setPlayer({
            pos: { x: Math.floor(STAGE_WIDTH / 2) - 2, y: 0 },
            tetromino: shape,
            collided: false,
        });
    }, []);

    const updatePlayerPos = ({ x, y, collided }: { x: number; y: number; collided: boolean }) => {
        setPlayer(prev => ({
            ...prev,
            pos: { x: prev.pos.x + x, y: prev.pos.y + y },
            collided,
        }));
    };

    const rotateMatrixCW = (m: any[][]) => m[0].map((_, i) => m.map(row => row[i]).reverse());

    const rotatePlayer = (stage: any) => {
        const rotated = rotateMatrixCW(player.tetromino);
        setPlayer(prev => ({ ...prev, tetromino: rotated }));
    };

    return { player, setPlayer, resetPlayer, updatePlayerPos, rotatePlayer };
}
