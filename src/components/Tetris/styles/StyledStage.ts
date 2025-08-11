// StyledStage.ts
type Size = { width: number; height: number; cell?: number; gap?: number };

export const StyledStage = ({ width, height, cell = 32, gap = 2 }: Size) => ({
  // 셀 크기/간격을 고정 픽셀로 만들어 소수점 제거
  display: 'grid',
  gridTemplateColumns: `repeat(${width}, ${cell}px)`,
  gridTemplateRows: `repeat(${height}, ${cell}px)`,
  gap: `${gap}px`,
  // 전체 크기를 "정수"로 정확히 계산
  width: `${width * cell + (width - 1) * gap}px`,
  height: `${height * cell + (height - 1) * gap}px`,
  background: '#111',
  // 끝 가장자리 한 줄 착시 방지
  padding: 0,
  boxSizing: 'content-box',
});
