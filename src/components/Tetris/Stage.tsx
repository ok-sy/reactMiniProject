import React from "react";
import { createStage } from "../gameHelper";
import Cell from "./Cell";
import { Box } from "@mui/material";

type StageProps = {
  stage: ReturnType<typeof createStage>;
};
const Stage: React.FC<StageProps> = ({ stage }) => (
  <Box>
    {stage.map((row, y) => (
      <Box key={y}>
        {row.map((cell, x) => (
          <Cell key={x} type={cell.type} />
        ))}
      </Box>
    ))}
    {/* {stage.map(row => row.map((cell,x) => <Cell <key=[x] type{cell[0]} />))} */}
  </Box>
);
export default Stage;
