import { useEffect, useState } from 'react';
import createStage from '../gameHelper';
import { TetrominoType } from '../tetrominos';

export type CellState = [TetrominoType, 'clear' | 'merged'];
export type StageGrid = CellState[][];

type Player = {
    pos: { x: number; y: number };
    tetromino: (TetrominoType | 0)[][];
    collided: boolean;
};

export default function useStage(player: Player, resetPlayer: () => void) {
    const [stage, setStage] = useState<StageGrid>(createStage() as StageGrid);
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {
        setRowsCleared(0);

        const sweepRows = (grid: StageGrid): StageGrid => {
            const newGrid = grid.filter(row => row.some(cell => cell[0] === 0));
            const cleared = grid.length - newGrid.length;
            if (cleared > 0) setRowsCleared(cleared);
            while (newGrid.length < grid.length) {
                newGrid.unshift(new Array(newGrid[0].length).fill([0, 'clear']) as CellState[]);
            }
            return newGrid;
        };

        const updateStage = (prev: StageGrid): StageGrid => {
            // 1) clear cells
            const newStage = prev.map(row => row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] as CellState : cell)));

            // 2) draw the player
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (!value) return;
                    const gx = x + player.pos.x;
                    const gy = y + player.pos.y;
                    if (gy < 0 || gx < 0 || gy >= newStage.length || gx >= newStage[0].length) return;
                    newStage[gy][gx] = [value as TetrominoType, 'clear'];
                });
            });

            // 3) merge if collided, then sweep
            if (player.collided) {
                const merged = newStage.map(row =>
                    row.map(cell => (cell[1] === 'clear' && cell[0] !== 0 ? [cell[0], 'merged'] as CellState : cell))
                );
                const swept = sweepRows(merged);
                resetPlayer();
                return swept;
            }

            return newStage;
        };

        setStage(prev => updateStage(prev));
    }, [player.collided, player.pos.x, player.pos.y, player.tetromino, resetPlayer]);

    return { stage, setStage, rowsCleared };
}
