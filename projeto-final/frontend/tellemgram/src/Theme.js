// theme.js

import { createTheme } from "@mui/material/styles";

const purpleTheme = createTheme({
  palette: {
    primary: {
      main: "#634B7C", // Substitua com a cor primária desejada
    },
    secondary: {
      main: "#e8d9e8", // Substitua com a cor secundária desejada
    },
    accent:{
      main: "#995c99", // Substitua com a cor primária desejada
    },
    action: {
      disabledBackground: "#e8d9e8",
      disabled: "#634B7C",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif", // Substitua com a fonte desejada
  },
});

export default purpleTheme;
