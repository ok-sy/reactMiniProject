//component
import { Box, Button, } from "@mui/material";
import { useState } from "react";
import Display from "../Display";
import createStage from "../gameHelper";
import Stage from "./components/Stage";
import StartButton from "./components/StartButton";


//style
import { StyledTetris, StyledTetrisWrapper } from "./styles/StyledTetris";


//Custom Hooks
import usePlayer from '../Tetris/hooks/usePlayer';
import useStage from '../Tetris/hooks/useStage';


export default function Tetris() {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);



  const player = usePlayer;
  const { stage, setStage } = useStage(player)

  console.log('re-render')

  const movePlayer = (dir: number) => {

  }

  const startGame = () => {
    //reset eventhing
    setStage(createStage)
    // resetPlayer()
   }

  const drop = () => { 
    // updatePlayerPos({ x:0, y:1, colided: false})
  }
  const dropPlayer = () => { 
    drop()
  }
  const move = (key: string) => {
    
    console.log(key)
    if (!gameOver) {
      if (key === "ArrowLeft") {
        movePlayer(-1)
      } else if (key === "ArrowRight") {
        movePlayer(1);
      } else if (key === "ArrowDown") {
        dropPlayer();
      }
        
    }
  }
  

  return (
    <Box sx={StyledTetrisWrapper}  >
      
      <Box className="StyledTetris" sx={StyledTetris} tabIndex={0} onKeyDown={e => {
        move(e.key)
      }}  >
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
