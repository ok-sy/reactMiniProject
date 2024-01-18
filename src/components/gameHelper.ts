export const STAGE_WIDTH = 30;
export const STAGE_HEIGHT = 8;

export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, "clear"])
  );

export default createStage;
