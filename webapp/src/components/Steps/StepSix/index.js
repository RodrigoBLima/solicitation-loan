import { Button, Container, Grid, Paper } from "@material-ui/core/";
import React, { useContext } from "react";

import Card from "../../Card";
import GlobalState from "../../../contexts";

import StorageIcon from "@material-ui/icons/Storage";
import SubHeader from "../../SubHeader";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  span: {
    marginLeft: 15,
    fontSize: 25,
  },
}));
export default function Index() {
  const classes = useStyles();
  const [state, setState] = useContext(GlobalState);

  if (state.currentStep !== 6) {
    // Prop: The current step
    return null;
  }

  return (
    <div>
      <div className={classes.root}>
        <Container>
          <br />
          <SubHeader>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <StorageIcon color="secondary" />
                  <span className={classes.span}>Solicitar empréstimo</span>
                </Paper>
              </Grid>
            </Grid>
          </SubHeader>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h2>Solicitação realizada com sucesso</h2>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <h5>Resumo da solicitação</h5>
              </Paper>
              <br />

              <Card>
                <p>{state.clientSearchedData.name}</p>

                <p>{state.cpfClientSearched}</p>
              </Card>
              <br />
              <Card>
                <p>{state.numberCardCreditClient}</p>

                <p style={{ color: "#03fc49" }}>
                  {state.dateValidCardCreditClient}
                </p>
              </Card>
              <br />
              <Card>
                <p>Valor desejado:</p>

                <p style={{ color: "#03fc49" }}>R$ {state.value}</p>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <h6>Taxa de juros</h6>
                <p>{state.installmentSelected.installmentInterest}%</p>
              </Card>
              <br />
              <Card>
                <p>Parcelas: </p>

                <p> {state.installmentSelected.installments}</p>
              </Card>
              <br />
              <Card>
                <p>Valor da parcela: </p>
                <p>R$: {state.installmentSelected.installmentValue}</p>
              </Card>
            </Grid>
          </Grid>
          <br />
          <Grid item xs={12}>
            <Card>
              <p>Valor total do empréstimo: </p>
              <p>R$: {state.installmentSelected.fullValue}</p>
            </Card>
          </Grid>
          <br />
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              href={`/solicitation/`}
              fullWidth
            >
              Visualizar solicitações
            </Button>
          </Grid>
        </Container>
      </div>
    </div>
  );
}
