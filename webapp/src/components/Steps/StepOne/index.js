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
  TextField,
} from "@material-ui/core/";
import React, { useContext } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import Footer from "../../Footer";
import GlobalState from "../../../contexts/";
import StorageIcon from "@material-ui/icons/Storage";
import SubHeader from "../../SubHeader";
import api from "../../../services/index";
import { useSnackbar } from "notistack";

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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function Index() {
  const [state, setState] = useContext(GlobalState);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  if (state.currentStep !== 1) {
    return null;
  }

  async function handleCalculate(e) {
    e.preventDefault();

    // if (state.value < 300 || state.value > 10000) {
    //   enqueueSnackbar(`Apenas valores entre 300 e 10000`, {
    //     variant: "error",
    //   });
    //   return;
    // }

    try {
      let response = await api.get(
        `/api/v1/ratetable/installment_value/?installment=${state.value}`
      );

      let { data, status } = response;

      if (data.length === 0) {
        enqueueSnackbar(
          `Infelizmente não temos esse valor disponivel no momento, tente novamente mais tarde`,
          {
            variant: "error",
          }
        );
      }

      setState((state) => ({ ...state, rateTableData: data }));
    } catch (error) {
      console.error(error);

      enqueueSnackbar(`Erro ao encontrar dados.`, {
        variant: "error",
      });
    }
  }

  function handleSelected(data, installment) {
    // console.log(data, installment);
    setState((state) => ({
      ...state,
      rateTableSelected: data,
      installmentSelected: installment,
    }));
  }

  return (
    <div>
      <div className={classes.root}>
        <Container>
          <br />
          <SubHeader>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <AddCircleIcon color="primary" fontSize="large" />
                  <StorageIcon color="secondary" fontSize="large" />
                  <span className={classes.span}>Simulação de taxas</span>
                </Paper>
              </Grid>
            </Grid>
          </SubHeader>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h4>Valor desejado</h4> <br />
              <form action="" onSubmit={handleCalculate}>
                <TextField
                  type="number"
                  value={state.value}
                  id="outlined-basic"
                  label="Digite o valor"
                  variant="outlined"
                  onChange={(e) =>
                    setState((state) => ({ ...state, value: e.target.value }))
                  }
                />

                <Button type="submit" variant="contained" color="secondary">
                  Calcular
                </Button>
              </form>
            </Grid>
          </Grid>
          <br />
          <hr />
          <br />

          {state.rateTableData.length > 0 &&
            state.rateTableData.map((row) => (
              <>
                <Paper className={classes.paper}>
                  <h1>{row.name}</h1>
                </Paper>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label=" table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Parcela</StyledTableCell>
                        <StyledTableCell align="right">
                          Juros da parcela
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          Valor da parcela
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          Valor Total
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          Comissão parceiro
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.installments.map((installment, index) => (
                        <StyledTableRow
                          key={index}
                          onClick={(e) => handleSelected(row, installment)}
                        >
                          <StyledTableCell component="th" scope="row">
                            {installment.installments}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {installment.installmentInterest}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {installment.installmentValue}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {installment.fullValue}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {installment.comission}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            ))}
        </Container>

        <Footer />
      </div>
    </div>
  );
}
