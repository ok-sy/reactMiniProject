//component
import { Box } from "@mui/material";
import Display from "../Display";
import createStage from "../gameHelper";
import Stage from "./components/Stage";
import StartButton from "./components/StartButton";
import { StyledTetris, StyledTetrisWrapper } from "./styles/StyledTetris";

export default function Tetris() {
  return (
    <Box sx={StyledTetrisWrapper}>
      <Box className="StyledTetris" sx={StyledTetris}>
        <Stage stage={createStage()} />
        <aside>
          <div>
            <Display gameOver={""} text={"Score"}></Display>
            <Display gameOver={""} text={"Rows"}></Display>
            <Display gameOver={""} text={"Level"}></Display>
          </div>
          <StartButton />
        </aside>
      </Box>
    </Box>
  );
}
