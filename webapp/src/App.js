import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import React, { useState } from "react";

import GlobalState from "./contexts/index";
import Header from "./components/Header";
import Routes from "./routes";
import { SnackbarProvider } from "notistack";
import theme from "./theme";

function App() {
  const [state, setState] = useState({});
  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <GlobalState.Provider value={[state, setState]}>
          <Header />
          <Routes />
        </GlobalState.Provider>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
}

export default App;
