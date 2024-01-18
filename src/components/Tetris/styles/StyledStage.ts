import { SxProps } from "@mui/material";

type Props = {
  width: number;
  height: number;
};

export const StyledStage = ({ width, height }: Props): SxProps => ({
  gridTemplateRows: `repeat(${height}, calc(25vw / ${width}))`,
  gridTemplateColumns: `repeat(${width}, 1fr)`,
  gridGap: "1px",
  border: "2px solid #333",
  width: "100%",
  // maxWidth: "25vw",
  background: "#111",
});
