import { Box } from "@mui/material";
import { TetrominoType } from "../../tetrominos";
import { rootSx } from "../styles/StyledCell";
type props = {
  type: TetrominoType;
};

export default function Cell(props: props) {
  return <Box className="Cell" sx={( rootSx(props))}></Box>;
}
