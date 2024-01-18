import React from "react";
import { StyledDisplay } from "./Tetris/styles/StyledDisplay";
import { Box } from "@mui/material";

type DisplayProps = {
  gameOver: string;
  text: string;
};
const Display: React.FC<DisplayProps> = ({ gameOver, text }) => (
  <Box sx={StyledDisplay({ gameOver })}>{text}</Box>
);
export default Display;
