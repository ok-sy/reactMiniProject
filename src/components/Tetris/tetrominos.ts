export type TetrominoType = "I" | "J" | "L" | "O" | "S" | "T" | "Z" | 0;
export type CellState = [TetrominoType, 'clear' | 'merged'];
export type StageGrid = CellState[][];
export const TETROMINOS = {
  0: { shape: [[0]], color: "0, 0, 0" },
  I: {
    shape: [
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
    ],
    color: "80, 227, 230",
  },
  J: {
    shape: [
      [0, "J", 0],
      [0, "J", 0],
      ["J", "J", 0],
    ],
    color: "36, 95, 223",
  },
  L: {
    shape: [
      [0, "L", 0],
      [0, "L", 0],
      [0, "L", "L"],
    ],
    color: "223, 173, 36",
  },
  O: {
    shape: [
      ["O", "O"],
      ["O", "O"],
    ],
    color: "223, 217, 36",
  },
  S: {
    shape: [
      [0, "S", "S"],
      ["S", "S", 0],
    ],
    color: "48, 221, 56",
  },
  T: {
    shape: [
      [0, 0, 0],
      ["T", "T", "T"],
      [0, "T", 0],
    ],
    color: "132, 61, 198",
  },
  Z: {
    shape: [
      ["Z", "Z", 0],
      [0, "Z", "Z"],
    ],
    color: "227, 78, 78",
  },
};

export function randomTetromino() {

  const tetrominos: TetrominoType[] = ["I", "J", "L", "O", "S", "T", "Z"];

  const randTetromino = tetrominos[
    Math.floor(Math.random() * tetrominos.length)
  ]
  return TETROMINOS[randTetromino];
  ;
};
