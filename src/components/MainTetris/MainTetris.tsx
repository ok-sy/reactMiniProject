// Tetris.tsx
import React, { useState, useEffect, useCallback } from "react";

const Tetris: React.FC = () => {
  const [board, setBoard] = useState<number[][]>([]);
  const [currentPiece, setCurrentPiece] = useState<number[][]>([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // 게임 초기화 함수
  const initGame = () => {
    // 게임 보드 초기화
    const initialBoard: number[][] = Array.from({ length: 20 }, () =>
      Array(10).fill(0)
    );
    setBoard(initialBoard);

    // 새로운 조각 생성 및 초기 위치 설정
    const newPiece = generateRandomPiece();
    setCurrentPiece(newPiece);
    setPosition({ x: 4, y: 0 });
  };

  // 랜덤으로 새로운 조각 생성
  const generateRandomPiece = () => {
    // 테트리스 조각들의 모양 정의
    const pieces: number[][][] = [
      [[1, 1, 1, 1]],
      [[1, 1, 1], [1]],
      [
        [1, 1, 1],
        [0, 0, 1],
      ],
      // ... 다양한 모양의 조각들
    ];

    const randomIndex = Math.floor(Math.random() * pieces.length);
    return pieces[randomIndex];
  };

  // 키보드 이벤트 핸들러
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    // 키보드 입력에 따른 동작 처리
    // 예를 들어, 좌우 이동, 회전, 하강 등을 구현
  }, []);

  // 게임 초기화 및 이벤트 리스너 등록
  useEffect(() => {
    initGame();
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const renderBoard = (): React.ReactNode => {
    // 보드 및 현재 조각을 기반으로 화면 렌더링
    // 예를 들어, HTML, CSS 등을 사용하여 그리기
    return (
      <div>
        {/* 실제 게임 화면을 그리는 JSX 코드 */}
        {/* 예시: */}
        {board.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((cell, colIndex) => (
              <span key={colIndex}>{cell}</span>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return <div>{renderBoard()}</div>;
};

export default Tetris;
