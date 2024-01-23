import { SxProps } from "@mui/material";

type Props = {
  width: number;
  height: number;
};

export const StyledStage = ({ width, height }: Props): SxProps => ({
  display: "grid",
  gridTemplateRows: "repeat(1, 1fr)",
  gridTemplateColumns: `repeat(1, 1fr)`,
  // gridTemplateRows: `repeat(${height}, calc(25vw / ${width}))`,
  // gridTemplateColumns: `repeat(${width}, 1fr)`,
  gridGap: "1px",
  width: "40%",
  maxWidth: "25vw",
  background: "#111",
});
