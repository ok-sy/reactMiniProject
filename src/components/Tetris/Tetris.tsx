import React from "react";
//component
import Stage from "./components/Stage";
import Display from "../Display";
import StartButton from "./components/StartButton";
import createStage from "../gameHelper";
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";
import { Box } from "@mui/material";
import TestGrid from "./components/TestGrid";

export default function Tetris() {
  return (
    <Box sx={StyledTetrisWrapper}>
      <Box className="StyledTetris" sx={StyledTetris}>
        <Stage stage={createStage()} />
        <aside>
          <div>
            <Display gameOver={""} text={"Score"}></Display>
            <Display gameOver={""} text={"Rows"}></Display>
            <Display gameOver={""} text={"Level"}></Display>
          </div>
          <StartButton />
        </aside>
      </Box>
    </Box>
  );
}
