import { Container, Grid, Paper, TextField } from '@material-ui/core/';
import React, { useContext } from 'react';

import GlobalState from '../../../contexts/';
import SubHeader from '../../SubHeader';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 100,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  span: {
    marginLeft: 15,
    fontSize: 25,
  },
}));

export default function Index() {
  const [state, setState] = useContext(GlobalState);
  const classes = useStyles();

  if (state.currentStep !== 3) {
    // Prop: The current step
    return null;
  }
  return (
    <div>
      <Container>
        <br />
        <SubHeader>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <span className={classes.span}>Solicitar empréstimo</span>
              </Paper>
            </Grid>
          </Grid>
        </SubHeader>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <span className={classes.span}>Insira os dados do cartão:</span>
            </Paper>
            <br />
            <Paper className={classes.paper}>
              <em>Nome:</em> <span className={classes.span}>{state.clientSearchedData.name}</span>
            </Paper>
            <br />
            <Paper className={classes.paper}>
              <TextField
                value={state.numberCardCreditClient}
                id="outlined-basic"
                label="Número do cartão"
                onChange={(e) =>
                  setState((state) => ({
                    ...state,
                    numberCardCreditClient: e.target.value,
                  }))
                }
              />
            </Paper>
            <br />
            <Paper className={classes.paper}>
              <TextField
                value={state.dateValidCardCreditClient}
                id="outlined-basic"
                label="Data de validade"
                onChange={(e) =>
                  setState((state) => ({
                    ...state,
                    dateValidCardCreditClient: e.target.value,
                  }))
                }
              />
            </Paper>
            <br />
            <Paper className={classes.paper}>
              <TextField
                value={state.CVCCardCreditClient}
                id="outlined-basic"
                label="CVC"
                onChange={(e) =>
                  setState((state) => ({
                    ...state,
                    CVCCardCreditClient: e.target.value,
                  }))
                }
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <span className={classes.span}>Faça upload dos anexos do cartão:</span>
            </Paper>
            <br />

            <Paper className={classes.paper}>
              <p>Cartão de crédito (frente)</p>
              <a href="#">Adicionar</a>
            </Paper>
            <br />
            <Paper className={classes.paper}>
              <br />
              <p>Cartão de crédito (verso)</p>
              <a href="#">Adicionar</a>
            </Paper>
            <br />
            <Paper className={classes.paper}>
              <p>Selfie com cartão de crédito</p>
              <a href="#">Adicionar</a>
            </Paper>
          </Grid>
        </Grid>

        <br />
        <hr />
      </Container>
    </div>
  );
}
