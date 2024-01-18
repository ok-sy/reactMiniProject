import React from "react";
import { createStage } from "../../gameHelper";
import Cell from "./Cell";
import { Box } from "@mui/material";
import { StyledStage } from "../styles/StyledStage";

type StageProps = {
  stage: ReturnType<typeof createStage>;
};

const Stage: React.FC<StageProps> = ({ stage }) => (
  <Box
    sx={
      (StyledStage({ width: stage[0].length, height: stage.length }),
      {
        display: "flex",
        gridTemplateRows: `repeat(${stage.length}, calc(25vw / ${stage[0].length}))`,
        gridTemplateColumns: `repeat(${stage[0].length}, 1fr)`,
        gridGap: "1px",
        border: "2px solid #333",
        width: "100%",
        maxWidth: "25vw",
        background: "#111",
      })
    }
  >
    {stage.map((row, y) => (
      <Box key={y}>
        {row.map((cell, x) => (
          <Cell key={x} type={cell[0]} />
        ))}
      </Box>
    ))}
  </Box>
);
export default Stage;
