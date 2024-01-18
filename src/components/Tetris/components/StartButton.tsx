import React from "react";

type StartButtonProps = {
  callBack?: Function;
};

const StartButton: React.FC<StartButtonProps> = ({ callBack }) => (
  <button>StartGame</button>
);
export default StartButton;
