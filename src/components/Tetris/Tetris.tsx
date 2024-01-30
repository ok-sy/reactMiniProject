//component
import { useState } from "react";
import { Box } from "@mui/material";
import Display from "../Display";
import createStage from "../gameHelper";
import Stage from "./components/Stage";
import StartButton from "./components/StartButton";

//style
import { StyledTetris, StyledTetrisWrapper } from "./styles/StyledTetris";


//Custom Hooks
import usePlayer from '../Tetris/hooks/usePlayer'
import useStage from '../Tetris/hooks/useStage'


export default function Tetris() {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const player = usePlayer;
  const { stage, setStage } = useStage(player)

  
  
  console.log('re-render')


  return (
    <Box sx={StyledTetrisWrapper}>
      <Box className="StyledTetris" sx={StyledTetris}>
        <Stage stage={stage} />
        <aside>
          { gameOver ? (
            <Display gameOver={"gameOver"} text="Game Over"/>
          ) : (
          <div>
            <Display gameOver={""} text={"Score"}></Display>
            <Display gameOver={""} text={"Rows"}></Display>
            <Display gameOver={""} text={"Level"}></Display>
          </div>
              ) }
          <StartButton />
          
        </aside>
        
      </Box>
    </Box>
  );
}
