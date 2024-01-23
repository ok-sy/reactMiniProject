import { SxProps } from "@mui/material/styles";
import { TETROMINOS, TetrominoType } from "../../tetrominos";

export type RootSxProps = {
  type: TetrominoType;
};

export const rootSx = ({ type }: RootSxProps): SxProps => ({
  width: "auto",
  height: 25,
  background: `rgba(${TETROMINOS[type].color}, 0.8)`,
  color: `rgba(${TETROMINOS[type].color})`,
  border: type === 0 ? "0px solid" : "4px solid",
  borderBottomColor: `rgba(${TETROMINOS[type].color}, 0.1)`,
  borderRightColor: `rgba(${TETROMINOS[type].color}, 1)`,
  borderLeftColor: `rgba(${TETROMINOS[type].color}, 0.3)`,
});
