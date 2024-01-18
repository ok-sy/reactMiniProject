import React from "react";
//component
import Stage from "./components/Stage";
import Display from "../Display";
import StartButton from "./components/StartButton";
import { createStage } from "../gameHelper";
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";
import { Box } from "@mui/material";

export default function Tetris() {
  return (
    <Box sx={StyledTetrisWrapper}>
      <Box sx={StyledTetris} >
        <Stage stage={createStage()}
       
        />
        {/* <aside>
          <div>
            <Display text={"Score"}></Display>
            <Display text={"Rows"}></Display>
            <Display text={"Level"}></Display>
          </div>
          <StartButton />
        </aside> */}
      </Box>
    </Box>
  );
}
