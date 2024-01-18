import Tetris from "../components/Tetris/components";
import React from "react";
import { rootSx } from "./style";
import { Box } from "@mui/material";
export default function MainPage() {
  return (
    <Box sx={rootSx}>
      <Box className="header">
        <h1>Welcome to My Tetris Game!</h1>

        <section>
          <h2>About the Game</h2>
          <p>
            This is a simple Tetris game built with React and TypeScript. Have
            fun playing and try to achieve a high score!
          </p>
        </section>
      </Box>
      <section>
        <h2>Play Tetris</h2>
        <Tetris />
      </section>
      <section>
        <h2>Latest News</h2>
        <p>Stay tuned for updates and new features in our Tetris game!</p>
      </section>
      <Box className="footer">
        <p>&copy; 2024 My Tetris Game. All rights reserved.</p>
      </Box>
    </Box>
  );
}
