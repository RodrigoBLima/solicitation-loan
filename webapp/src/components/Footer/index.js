import { Container, Grid } from "@material-ui/core/";
import React, { useContext } from "react";

import GlobalState from "../../contexts";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
  },
  footer: {
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%",
    backgroundColor: "#228a95",
    height: "80px",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  buttonStep: {
    margin: theme.spacing(3, 0, 2),
    color: "#fff",
    fontSize: 12,
    height: theme.spacing(6),
    "&:hover": {
      opacity: 0.8,
      transition: 0.2,
    },
  },
}));

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [state, setState] = useContext(GlobalState);

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Grid container spacing={3}>
          <Grid item xs>
            Nome: {state.rateTableSelected.name}
          </Grid>
          <Grid item xs>
            Parcelas: {state.installmentSelected.installments}
          </Grid>
          <Grid item xs>
            Valor da parcela: {state.installmentSelected.installmentValue}
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}
