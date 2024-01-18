import React from "react";
import { Box } from "@mui/material";
import { RootSxProps, rootSx } from "../styles/StyledCell";
import { TETROMINOS, randomTetromino } from "../../tetrominos";

type TetrominoType = "I" | "J" | "L" | "O" | "S" | "T" | "Z" | 0;

const TEST_DATE: RootSxProps = {
  type: "L",
};
type Props = {
  type: TetrominoType;
};
const Cell: React.FC<Props> = ({ type }) => {
  return <Box sx={rootSx(TEST_DATE)}>cell</Box>;
};

export default Cell;
