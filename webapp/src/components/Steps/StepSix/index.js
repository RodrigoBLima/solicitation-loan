import { Button, Container, Grid, Paper, Typography } from '@material-ui/core/';
import React, { useContext } from 'react';

import GlobalState from '../../../contexts';
import SubHeader from '../../SubHeader';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paperGreen: {
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: '#95d3a7',
    color: theme.palette.text.secondary,
  },
  span: {
    marginLeft: 15,
    fontSize: 25,
  },
}));

export default function Index() {
  const classes = useStyles();
  // eslint-disable-next-line
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
                  <Typography className={classes.span}>Solicitar empréstimo</Typography>
                </Paper>
              </Grid>
            </Grid>
          </SubHeader>

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography>Resumo da solicitação</Typography>
              </Paper>

              <br />

              <Paper className={classes.paperGreen}>
                <Typography>{state.clientSearchedData.name}</Typography>

                <Typography>{state.cpfClientSearched}</Typography>
              </Paper>

              <br />

              <Paper className={classes.paperGreen}>
                <Typography>{state.numberCardCreditClient}</Typography>

                <Typography style={{ color: '#78da93' }}>{state.dateValidCardCreditClient}</Typography>
              </Paper>

              <br />

              <Paper className={classes.paperGreen}>
                <Typography>Valor desejado:</Typography>

                <Typography>R$ {state.value}</Typography>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper className={classes.paperGreen}>
                <Typography>Taxa de juros</Typography>
                <Typography>{state.installmentSelected.installmentInterest}%</Typography>
              </Paper>

              <br />

              <Paper className={classes.paperGreen}>
                <Typography>Parcelas: </Typography>

                <p> {state.installmentSelected.installments}</p>
              </Paper>

              <br />

              <Paper className={classes.paperGreen}>
                <Typography>Valor da parcela: </Typography>
                <Typography>R$: {state.installmentSelected.installmentValue}</Typography>
              </Paper>
            </Grid>
          </Grid>
          <br />
          <Grid item xs={12}>
            <Paper className={classes.paperGreen}>
              <Typography>Valor total do empréstimo: </Typography>
              <Typography>R$: {state.installmentSelected.fullValue}</Typography>
            </Paper>
          </Grid>
          <br />
          <Grid item xs={12}>
            <Button variant="contained" color="secondary" href={`/solicitation/`} fullWidth>
              Visualizar solicitações
            </Button>
          </Grid>
        </Container>
      </div>
    </div>
  );
}
