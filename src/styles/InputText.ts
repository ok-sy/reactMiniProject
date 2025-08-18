import { SxProps } from "@mui/material";

export const rootSx: SxProps = {
    ".inputTextContainer": {
        width: "100%",
        border: 0,
    },
    ".inputText": {
        width: "100%",
        height: "50px",
        border: 0,
        borderTop: "0.1px solid rgb(193, 185, 185)",
        borderRadius: "0 0 30px 30px",
        fontSize: "18px",
        textAlign: "center",
        boxSizing: "border-box",
        "&:focus": {
            outline: "none",
            border: "1px solid rgb(130, 124, 124)",
        },
    },
};