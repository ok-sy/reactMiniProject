import React from "react";
import { Box } from "@mui/material";
import { RootSxProps, rootSx } from "../styles/StyledCell";
import { TETROMINOS, randomTetromino, TetrominoType } from "../../tetrominos";
type props = {
  type: TetrominoType;
};

export default function Cell(props: props) {
  return <Box sx={rootSx(props)}></Box>;
}
