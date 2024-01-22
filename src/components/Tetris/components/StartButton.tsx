import { Box } from "@mui/material";
import React from "react";
import { StyledStartButton } from "../styles/StyledStartButton";

type StartButtonProps = {
  callBack?: React.MouseEventHandler<HTMLDivElement>;
};

const StartButton: React.FC<StartButtonProps> = ({ callBack }) => (
  <Box sx={StyledStartButton} onClick={callBack}>
    StartGame
  </Box>
);
export default StartButton;
