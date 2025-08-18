import { Box } from "@mui/material";
import React from "react";
import { rootSx } from "../../styles/CheckBox";


interface CheckBoxProps {
  checked?: boolean;
  onClick?(): void;
}

const CheckBox = ({ checked, onClick }: CheckBoxProps) => {
  return (
    <Box sx={rootSx} className="container" onClick={onClick}>
      <Box className="checkIcon">{checked && "✔︎"}</Box>
    </Box>
  );
};

export default CheckBox;
