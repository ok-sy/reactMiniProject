import Cell from "./Cell";
import { Box, Grid } from "@mui/material";
import { StyledStage } from "../styles/StyledStage";
import { TetrominoType } from "../tetrominos";

type StageProps = {
  stage: TetrominoType[][][];
};
export default function Stage({ stage }: StageProps) {
  const width = stage[0].length;
  const height = stage.length;

  return (
    <Box className="Stage" sx={StyledStage({ width, height })}>
      {stage.flatMap((row, y) =>
        row.map((cell, x) => (
          <Cell key={`${y}-${x}`} type={cell[0] as TetrominoType} />
        ))
      )}
    </Box>
  );
}
