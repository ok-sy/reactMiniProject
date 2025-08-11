// src/components/gameHelper.ts
export const STAGE_HEIGHT = 20;
export const STAGE_WIDTH = 12;

export type CellState = [import('./tetrominos').TetrominoType, 'clear' | 'merged'];
export type StageGrid = CellState[][];

export default function createStage(): StageGrid {
  return Array.from({ length: STAGE_HEIGHT }, () =>
    Array.from({ length: STAGE_WIDTH }, () => [0, 'clear'])
  );
}

// 충돌 체크 (이동/낙하/회전 적용 전에 반드시 호출)
export function checkCollision(
  stage: StageGrid,
  player: {
    pos: { x: number; y: number };
    tetromino: (import('./tetrominos').TetrominoType | 0)[][];
  },
  move: { x: number; y: number }
) {
  const { tetromino, pos } = player;
  for (let y = 0; y < tetromino.length; y++) {
    for (let x = 0; x < tetromino[y].length; x++) {
      const val = tetromino[y][x];
      if (!val) continue;
      const nx = pos.x + x + move.x;
      const ny = pos.y + y + move.y;

      // 보드 밖이면 충돌
      if (ny >= STAGE_HEIGHT || nx < 0 || nx >= STAGE_WIDTH) return true;
      // 상단(음수 y)은 스폰 과정에서 허용
      if (ny < 0) continue;
      // 고정 블록과 충돌
      if (stage[ny][nx][0] !== 0 && stage[ny][nx][1] === 'merged') return true;
    }
  }
  return false;
}
