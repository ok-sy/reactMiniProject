export const STAGE_HEIGHT = 20;
export const STAGE_WIDTH = 12;

export default function createStage() {
  return Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, "clear"])
  );
}
