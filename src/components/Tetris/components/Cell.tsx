import { Box } from "@mui/material";
import { TetrominoType } from "../tetrominos";
import { rootSx } from "../styles/StyledCell";
type props = {
  type: TetrominoType;
};
const log = (props: props) => {
  console.log(props)
}
export default function Cell({ type }: { type: TetrominoType }) {
  return <Box className="Cell" sx={rootSx({ type })} />;
}
