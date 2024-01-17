import React from "react";

type DisplayProps = {
  gameOver?: String;
  text: String;
};
const Display: React.FC<DisplayProps> = ({ gameOver, text }) => (
  <div>{text}</div>
);
export default Display;

