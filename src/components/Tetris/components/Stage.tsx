import React from "react";
import createStage from "../../gameHelper";
import Cell from "./Cell";
import { Box, Grid } from "@mui/material";
import { StyledStage } from "../styles/StyledStage";
import { TetrominoType } from "../../tetrominos";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

type StageProps = {
  stage: TetrominoType[][][];
};
export default function Stage({ stage }: StageProps) {
  return (
    <Box
      className="Stage"
      sx={StyledStage({ width: stage[0].length, height: stage.length })}
    >
      {/* `stage` 배열을 반복문으로 순회하면서, 각 행을 렌더링합니다. */}
      {stage.map((row, y) => (
        <Box
          key={y}
          className="row"
          sx={{ display: "grid", gridAutoFlow: "column" }}
        >
          {/* `row` 배열을 반복문으로 순회하면서, 각 셀을 렌더링합니다. */}
          {row.map((cell, x) => (
            // <Cell key={x} type={cell[0]} />
            <Cell key={x} type={"Z"} />
          ))}
        </Box>
      ))}
    </Box>
  );
}
