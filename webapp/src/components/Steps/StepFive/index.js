import {
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core/';
import React, { useContext } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import Card from '../../Card';
import GlobalState from '../../../contexts/';
import SubHeader from '../../SubHeader';
import api from '../../../services/index';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  span: {
    marginLeft: 15,
    fontSize: 25,
  },
  table: {
    minWidth: 700,
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function Index() {
  const [state, setState] = useContext(GlobalState);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  if (state.currentStep !== 5) {
    // Prop: The current step
    return null;
  }

  function getGetFormData() {
    let form_data = new FormData();

    form_data.append('clientId', state.clientSearchedData[0].id);
    form_data.append('installmentInterest', parseInt(state.installmentSelected.installmentInterest));
    form_data.append('installmentInterestValue', parseInt(state.installmentSelected.installmentValue));
    form_data.append('comission', state.installmentSelected.comission);
    form_data.append('comissionValue', state.installmentSelected.comission);
    form_data.append('installmentValue', parseInt(state.installmentSelected.installmentValue));
    form_data.append('cardNumber', state.numberCardCreditClient);
    form_data.append('desiredValue', parseInt(state.value));
    form_data.append('totalLoan', parseInt(state.installmentSelected.installmentValue));
    form_data.append('installmentId', state.installmentSelected.installments);
    form_data.append('rateTableId', state.rateTableData[0].id);

    return form_data;
  }

  async function handleCreateNewSolicitation(e) {
    e.preventDefault();

    try {
      let response = await api.post(`/api/v1/solicitation/`, getGetFormData());

      let { data, status } = response;

      console.log(data, status);

      if (status !== 201) {
        enqueueSnackbar(`Infelizmente ocorreu um erro durante o processo, tente novamente mais tarde.`, {
          variant: 'error',
        });
        return;
      }

      enqueueSnackbar(`Nova solicitação criada com sucesso.`, {
        variant: 'success',
      });

      setTimeout(() => {
        setState((state) => ({
          ...state,
          currentStep: 6,
        }));
      }, 4000);
    } catch (error) {
      console.error(error);
    }
  }

  function handleSelected(data, installment) {
    console.log(data, installment);
    setState((state) => ({
      ...state,
      rateTableSelected: data,
      installmentSelected: installment,
    }));
  }

  // function setModality(type) {
  //   setState((state) => ({
  //     ...state,
  //     modality: type,
  //   }));
  // }

  return (
    <div>
      <Container>
        <br />

        <SubHeader>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <span className={classes.span}>Solicitar empréstimo</span>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <span className={classes.span}>{state.rateTableSelected.name}</span>
              </Paper>
            </Grid>
          </Grid>
        </SubHeader>
        <br />

        <form action="" onSubmit={handleCreateNewSolicitation}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Card>
                <Typography>Valor desejado</Typography>
                <Typography>R$ {state.value}</Typography>
              </Card>
              <br />
              <Card>
                <Typography>Parcelas: </Typography>

                <Typography>{state.installmentSelected.installments} </Typography>
              </Card>
              <br />
            </Grid>
            <Grid item xs={6}>
              <Card>
                <Typography>Valor total empréstimo: </Typography>
                <Typography>R$: {state.installmentSelected.fullValue}</Typography>
              </Card>
              <br />
              <Card>
                <Typography>Valor empréstimo: </Typography>
                <Typography>R$: {state.installmentSelected.fullValue}</Typography>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                // onClick={setModality("Automático")}
              >
                Automático
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                fullWidth
                // onClick={setModality("Manual")}
              >
                Manual
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button type="submit" variant="contained" color="secondary" fullWidth>
                Concluir
              </Button>
            </Grid>
          </Grid>
        </form>
        <br />
        <hr />
        <br />
        {state.rateTableData.length > 0 &&
          state.rateTableData.map((row) => (
            <>
              <Paper className={classes.paper}>
                <Typography>{row.name}</Typography>
              </Paper>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label=" table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Parcela</StyledTableCell>
                      <StyledTableCell align="right">Juros da parcela</StyledTableCell>
                      <StyledTableCell align="right">Valor da parcela</StyledTableCell>
                      <StyledTableCell align="right">Valor Total</StyledTableCell>
                      <StyledTableCell align="right">Comissão parceiro</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.installments.map((installment, index) => (
                      <StyledTableRow key={index} onClick={() => handleSelected(row, installment)}>
                        <StyledTableCell component="th" scope="row">
                          {installment.installments}
                        </StyledTableCell>
                        <StyledTableCell align="right">{installment.installmentInterest}</StyledTableCell>
                        <StyledTableCell align="right">{installment.installmentValue}</StyledTableCell>
                        <StyledTableCell align="right">{installment.fullValue}</StyledTableCell>
                        <StyledTableCell align="right">{installment.comission}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <br />
            </>
          ))}
      </Container>
      <br />
    </div>
  );
}
