import { SxProps } from "@mui/material/styles";

export const StyledTetrisWrapper: SxProps = {
  width: "50vw",
  minHeight: 800,
  background: "#efefef",
  backgroundSize: "cover",
  // overflow: "hidden",

};

export const StyledTetris: SxProps = {
  display: "flex",
  alignItems: "flex-start",
  p: "40px",
  m: "0 auto",
  maxWidth: "900px",
  justifyContent: "center",

  aside: {
    width: "100%",
    maxWidth: "200px",
    display: "block",
    padding: "0 20px",
  },


};
