import React from "react";
import { Box } from "@mui/material";
import { RootSxProps, rootSx } from "./CellStyle";
import { TETROMINOS, randomTetromino } from "../tetrominos";

type TetrominoType = "I" | "J" | "L" | "O" | "S" | "T" | "Z" | 0;

const TEST_DATE: RootSxProps = {
  type: "O",
};
type Props = {
  type: TetrominoType;
};
const Cell: React.FC<Props> = ({ type }) => {
  // randomTetromino()
  return <Box sx={rootSx(TEST_DATE)}>cell {type}</Box>;
};

export default Cell;
