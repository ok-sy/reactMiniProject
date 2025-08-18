// src/components/Tetris/Tetris.tsx
import { Box, Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import Display from "./Display";
import createStage, { checkCollision, StageGrid } from "./gameHelper";
import Stage from "./components/Stage";
import StartButton from "./components/StartButton";
import { StyledTetris, StyledTetrisWrapper } from "./styles/StyledTetris";
import usePlayer from './hooks/usePlayer';
import useStage from './hooks/useStage';
import { TetrominoType } from "./tetrominos";

// 간단한 useInterval
function useInterval(callback: () => void, delay: number | null) {
  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(callback, delay);
    return () => clearInterval(id);
  }, [callback, delay]);
}

export default function Tetris() {
  const { player, resetPlayer, updatePlayerPos, rotatePlayer } = usePlayer();
  const { stage, setStage } = useStage(
    { ...player, tetromino: player.tetromino as TetrominoType[][] },
    resetPlayer
  );

  const [dropTime, setDropTime] = useState<number | null>(1000);
  const [gameOver, setGameOver] = useState(false);

  const movePlayer = useCallback((dir: number) => {
    if (gameOver) return;
    const playerWithCorrectType = {
      ...player,
      tetromino: player.tetromino as TetrominoType[][],
    };
    if (!checkCollision(stage as StageGrid, { ...playerWithCorrectType, tetromino: playerWithCorrectType.tetromino as TetrominoType[][] }, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0, collided: false });
    }
  }, [gameOver, player, stage, updatePlayerPos]);
  // Removed duplicate drop function declaration

  const drop = useCallback(() => {
    if (!checkCollision(stage as StageGrid, { ...player, tetromino: player.tetromino as TetrominoType[][] }, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // 바닥/블록 충돌: 고정 트리거
      updatePlayerPos({ x: 0, y: 0, collided: true });

      // 스폰 직후 충돌이면 게임오버 처리
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
    }
  }, [player, stage, updatePlayerPos, setDropTime, setGameOver]);

  // 자동 낙하
  useInterval(drop, dropTime);

  const keyUp = ({ keyCode }: KeyboardEvent) => {
    if (keyCode === 40) setDropTime(1000); // ↓ 떼면 속도 복구
  };

  const handleKeyDown = useCallback(({ keyCode }: KeyboardEvent) => {
    if (gameOver) return;
    if (keyCode === 37) movePlayer(-1);        // ←
    else if (keyCode === 39) movePlayer(1);    // →
    else if (keyCode === 40) {                 // ↓
      setDropTime(30);
      drop();
    } else if (keyCode === 38) {               // ↑ 회전
      // 회전 시 충돌 체크/벽킥은 간단버전으로 시작
      rotatePlayer(stage);
    }
  }, [gameOver, movePlayer, setDropTime, drop, rotatePlayer, stage]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', keyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', keyUp);
    };
  }, [handleKeyDown]);

  const startGame = () => {
    // 매번 완전 리셋: 중복 타이머/상태 제거
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
    setDropTime(1000); // 1초 간격으로 자동 낙하 시작
  };

  return (
    <Box sx={StyledTetrisWrapper}  >
      <Box sx={StyledTetrisWrapper}>
        <Box className="tetris" sx={StyledTetris}>
          <Stage stage={stage as any} />
          <aside>
            {gameOver ? (
              <Display gameOver={"true"} text={"Game Over"} />
            ) : (
              <div>
                <Display gameOver={""} text={"Score"} />
                <Display gameOver={""} text={"Rows"} />
                <Display gameOver={""} text={"Level"} />
              </div>
            )}
            <StartButton callBack={startGame} />
          </aside>
        </Box>
      </Box>
    </Box>
  );
}
