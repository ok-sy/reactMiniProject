import React from "react";
import { StyledDisplay } from "./styles/StyledDisplay";
import { Box } from "@mui/material";

type DisplayProps = {
  gameOver: string;
  text: string;
};
export default function Display(props: DisplayProps) {
  const { gameOver, text } = props;
  return <Box sx={StyledDisplay({ gameOver })}>{text}</Box>;
}
