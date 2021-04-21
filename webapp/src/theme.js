import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import { createMuiTheme } from "@material-ui/core";

const palette: PaletteOptions = {
  primary: {
    main: "#228a95",
  },
  secondary: {
    main: "#ef9c4b",
  },
  background: {
    default: "#f8f8f8",
  },
};

const theme = createMuiTheme({
  palette,
});

export default theme;
