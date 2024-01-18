import { SxProps } from "@mui/material/styles";

export const StyledTetrisWrapper: SxProps = {
  width: "100vw",
  height: "100vh",
  background: "#efefef",
  backgroundSize: "cover",
  display: "flex",
  overflow: "hidden",
};

export const StyledTetris: SxProps = {
  display: "flex",
  alignItems: "flex-start",
  p: "40px",
  m: "0 auto",
  maxWidth: "900px",

  aside: {
    width: "100%",
    maxWidth: "200px",
    display: "block",
    padding: "0 20px",
  },
};
