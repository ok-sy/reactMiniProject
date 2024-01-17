import { SxProps } from "@mui/material/styles";
import { TETROMINOS } from "../tetrominos";

type TetrominoType = "I" | "J" | "L" | "O" | "S" | "T" | "Z" | 0;

export type RootSxProps = {
  type: TetrominoType;
};
export const rootSx = ({ type }: RootSxProps): SxProps => ({
  width: "auto",
  body: {
    margin: 0,
  },
  font: {
    fontFamily: "Pixel",
  },
  background: `rgba(${TETROMINOS[type].color}, 0.8)`,
  color: `rgba(${TETROMINOS[type].color})`,
  border: type === 0 ? "0px solid" : "4px solid",
  borderBottomColor: `rgba(${TETROMINOS[type].color}, 0.1)`,
  borderRightColor: `rgba(${TETROMINOS[type].color}, 1)`,
  borderLeftColor: `rgba(${TETROMINOS[type].color}, 0.3)`,
});
