import { SxProps } from "@mui/material";
export const rootSx: SxProps = {
    ".deleteButtonContainer": {
        width: 25,
        height: 25,
        fontSize: 25,
        cursor: "pointer",
        "&:hover": {
            color: "red"
        }
    }
};