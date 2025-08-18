// Text.tsx

import { Box } from "@mui/material";
import React from "react";
import { rootSx } from "../../styles/Text";

interface TextProps {
  completed?: boolean;
  children: React.ReactNode;
}

const Text = ({ completed, children }: TextProps) => {
  return (
    <>
      <Box sx={rootSx} className={`text ${completed ? "completedText" : ""}`}>
        {children}
      </Box>
    </>
  );
};

export default Text;
