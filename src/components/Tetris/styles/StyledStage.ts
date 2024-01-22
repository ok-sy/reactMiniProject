import { SxProps } from "@mui/material";

type Props = {
  width: number;
  height: number;
};

export const StyledStage = ({ width, height }: Props): SxProps => ({
  display: "grid",
  gridTemplateRows: `repeat(${height}, calc(25vw / ${width}))`,
  gridTemplateColumns: `repeat(${width}, 1fr)`,
  Gap: "1px",
  border: "2px solid red",
  backgroundColor: "red",
  width: "100%",
  maxWidth: "25vw",
  background: "#111",
  // "& div": {
  //   /* 하위 div의 크기를 그리드 칸의 크기와 일치하도록 설정 */
  //   width: `${width}, 1fr`,
  //   height: `${height}, calc(25vw / ${width})`,
  //   gridRow: "1 / span 1",
  //   gridColumn: "1 / span 1",
  //   display: "grid",
  // },
});
