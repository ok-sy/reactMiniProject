import React from "react";
import as from "./components/MainTetris";

const MainPage: React.FC = () => {
  return (
    <div>
      옥승엽 미니 프로젝트 for TypeScript & react
      <header>
        <h1>Welcome to My Tetris Game!</h1>
      </header>
      <section>
        <h2>About the Game</h2>
        <p>
          This is a simple Tetris game built with React and TypeScript. Have fun
          playing and try to achieve a high score!
        </p>
      </section>
      <section>
        <h2>Play Tetris</h2>
      </section>
      <section>
        <h2>Latest News</h2>
        <p>Stay tuned for updates and new features in our Tetris game!</p>
      </section>
      <footer>
        <p>&copy; 2024 My Tetris Game. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainPage;
