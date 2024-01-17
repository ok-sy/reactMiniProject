import React from "react";
//component
import Stage from "./Stage";
import Display from "../Display";
import StartButton from "./StartButton";
import { createStage } from "../gameHelper";

export default function Tetris() {
  return (
    <div>
      <Stage stage={createStage()} />
      <aside>
        <div>
          <Display text={"Score"}></Display>
          <Display text={"Rows"}></Display>
          <Display text={"Level"}></Display>
        </div>
        <StartButton />
      </aside>
    </div>
  );
}
