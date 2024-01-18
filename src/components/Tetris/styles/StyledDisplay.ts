import { SxProps } from "@mui/material/styles";

interface Props {
  gameOver?: string;
}
export const StyledDisplay = ({ gameOver }: Props): SxProps => ({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  m: "0 0 20px 0",
  p: "20px",
  border: "4px solid #333",
  minHeight: "30px",
  width: "100%",
  borderRadius: "20px",
  corlor: `${gameOver ? "red" : "#9999"}`,
  fontFamily: "Pixel, Arial, Helvetica, sans-serif",
  fontSize: "0.8rem",
});
