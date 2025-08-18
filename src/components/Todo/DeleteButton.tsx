import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { rootSx } from "../../styles/DeleteButton"
import { Box } from "@mui/material";

interface DeleteButtonProps {
  onClick?(): void;
}

const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <>
      <Box sx={rootSx} className="deleteButtonContainer" onClick={onClick}>
        <DeleteIcon />
      </Box>
    </>
  );
};

export default DeleteButton;
