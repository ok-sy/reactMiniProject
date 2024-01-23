import { Box } from "@mui/material";
export default function TestGrid() {
  return (
    <Box
      sx={{
        width: "500px",
        p: 2,
        border: "1px solid red",
        display: "grid",
        gridTemplateColumns: "repeat(20, 1fr) ",
        gridTemplateRows: "repeat(12, 1fr)",
        // gridAutoFlow: "column",
      }}
    >
      <Box
        sx={{
          // p: 2,
          border: "1px solid red",
          display: "grid",
          //   gridAutoFlow: "column",
        }}
      >
        <Box sx={{ p: 2, border: "1px solid red" }}>test</Box>
        <Box sx={{ p: 2, border: "1px solid red" }}>test</Box>
        <Box sx={{ p: 2, border: "1px solid red" }}>test</Box>
        <Box sx={{ p: 2, border: "1px solid red" }}>test</Box>
        <Box sx={{ p: 2, border: "1px solid red" }}>test</Box>
        <Box sx={{ p: 2, border: "1px solid red" }}>test</Box>
      </Box>
      <Box
        sx={{
          // p: 2,
          border: "1px solid red",
          display: "grid",
          gridAutoFlow: "column",
        }}
      >
        <Box sx={{ p: 2, border: "1px solid red" }}>test</Box>
        <Box sx={{ p: 2, border: "1px solid red" }}>test</Box>
        <Box sx={{ p: 2, border: "1px solid red" }}>test</Box>
        <Box sx={{ p: 2, border: "1px solid red" }}>test</Box>
        <Box sx={{ p: 2, border: "1px solid red" }}>test</Box>
        <Box sx={{ p: 2, border: "1px solid red" }}>test</Box>
      </Box>
    </Box>
  );
}
