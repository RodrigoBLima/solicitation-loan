import { Button, Grid, Paper } from "@material-ui/core/";
import React, { useContext } from "react";

import GlobalState from "../../../contexts/";
import StorageIcon from "@material-ui/icons/Storage";
import SubHeader from "../../SubHeader";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({}));

export default function Index() {
  const [state, setState] = useContext(GlobalState);
  const classes = useStyles();

  if (state.currentStep !== 4) {
    // Prop: The current step
    return null;
  }

  return (
    <div>
      <br />
      <SubHeader>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <h1 className={classes.span}>
                <StorageIcon color="secondary" />
                Solicitar empréstimo
              </h1>
            </Paper>
          </Grid>
        </Grid>
      </SubHeader>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div>
            <Button variant="contained" color="primary">
              Cartão de crédito
            </Button>
          </div>
          <div>ou</div>
          <div>
            <Button variant="contained" color="primary" disabled>
              Crédito consignado
            </Button>
            <span>Em breve</span>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
