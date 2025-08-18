import { SxProps } from "@mui/material";
export const rootSx: SxProps = {
    "&.container": {
        width: "25px",
        height: "25px",
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid black",
        cursor: "pointer",
        "&:hover": {
            border: "2px solid rgb(0, 221, 0)",
        },
    },
    ".checkIcon": {
        position: "absolute",
        fontSize: "30px",
        color: "rgb(0, 221, 0)",
    },
};