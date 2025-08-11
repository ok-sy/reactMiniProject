import { SxProps } from "@mui/material";

type Size = { width: number; height: number };
export const StyledStage = ({ width, height }: Size) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${width}, 1fr)`,
  gridTemplateRows: `repeat(${height}, 1fr)`,
  gap: 1,                 // 간격이 너무 크면 셀이 얇아보일 수 있음
  width: 480,             // 원하는 보드 폭
  height: 800,            // 원하는 보드 높이(20행이면 40px/칸)
  background: '#111',
  padding: 4,
  boxSizing: 'border-box',
  overflow: 'hidden',
});
