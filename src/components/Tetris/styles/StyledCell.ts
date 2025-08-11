import { TetrominoType } from "../../tetrominos";

const colorMap: Record<TetrominoType, string> = {
  0: 'rgba(0,0,0,0.2)',
  I: 'rgb(80,227,230)',
  J: 'rgb(36,95,223)',
  L: 'rgb(223,173,36)',
  O: 'rgb(223,217,36)',
  S: 'rgb(48,211,56)',
  T: 'rgb(132,61,198)',
  Z: 'rgb(227,78,78)',
};

export const rootSx = ({ type }: { type: TetrominoType }) => ({
  display: 'block',
  width: '100%',
  height: '100%',
  padding: 0,
  margin: 0,
  boxSizing: 'border-box',
  background: colorMap[type],
  // 보더 효과는 크기에 영향 없는 inset shadow로
  boxShadow:
    type === 0
      ? 'inset 0 0 0 1px rgba(0,0,0,0.15)'
      : 'inset 0 2px 0 rgba(255,255,255,0.25), inset 0 -2px 0 rgba(0,0,0,0.35)',
  border: 'none',       // border 쓰면 트랙이 줄어들어 줄 무너짐 발생
  overflow: 'hidden',
});
