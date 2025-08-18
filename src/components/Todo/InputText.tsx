import React from "react";
import { rootSx } from "../../styles/InputText";
import { Box } from "@mui/material";

interface InputTextProps {
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void;
  inputText: string;
}

const InputText = ({ onChange, onKeyDown, inputText }: InputTextProps) => {
  return (
    <Box sx={rootSx} className="inputTextContainer">
      <input
        type="text"
        className="inputText"
        placeholder="내용을 입력후 엔터"
        onChange={(e) => onChange(e)}
        onKeyDown={(e) => onKeyDown(e)}
        value={inputText}
      />
    </Box>
  );
};

export default InputText;
