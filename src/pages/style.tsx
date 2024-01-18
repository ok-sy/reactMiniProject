import { SxProps } from "@mui/material/styles";

export const rootSx: SxProps = {
  display: "flex",
  flexDirection: "column",
  body: {
    margin: 0,
  },

  fontFamily: "Pixel",

  "& .header": {
    // position: "fixed",
    width: "100%",
    height: "20vh",
    backgroundColor: "rgba(51, 51, 51, 0.2)3",
  },
  "& .footer": {
    // position: "fixed",
    bottom: 0,
    width: "100%",
    height: "50px",
    backgroundColor: "#efefef",
    padding: "10px",
    color: "#bbb7b7b33",
    opacity: "50%",
  },
};
