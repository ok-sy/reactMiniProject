import React from "react";

type StartButtonProps = {
  callBack?: Function;
};

const StartButton: React.FC<StartButtonProps> = ({ callBack }) => (
  <div>StartGame</div>
);
export default StartButton;
