import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core/';
import React, { useEffect, useState } from 'react';

import api from '../../services/index';
import { withStyles } from '@material-ui/core/styles';

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
  const [listSolicitations, setListSolicitations] = useState([]);

  async function getSolicitations() {
    let response = await api.get(`api/v1/solicitation/`);

    let { data } = await response;

    if (data) {
      setListSolicitations(data);
    }
  }

  useEffect(() => {
    getSolicitations();
  }, []);

  return (
    <Container>
      {listSolicitations.length > 0 ? (
        <div className="centered">
          <TableContainer component={Paper}>
            <Table aria-label=" table">
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
                {listSolicitations.map((solicitation, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {solicitation.installmentId}
                    </StyledTableCell>
                    <StyledTableCell align="right">{solicitation.installmentInterest}</StyledTableCell>
                    <StyledTableCell align="right">{solicitation.installmentValue}</StyledTableCell>
                    <StyledTableCell align="right">{solicitation.totalLoan}</StyledTableCell>
                    <StyledTableCell align="right">{solicitation.comission}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <h4>Ainda não existem solicitações pendentes</h4>
      )}
    </Container>
  );
}
