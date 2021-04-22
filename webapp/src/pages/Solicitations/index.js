import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core/';
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
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
      <Box display="flex" style={{ marginTop: '14em' }} justifyContent="center" m={1} p={1} bgcolor="background.paper">
        {listSolicitations.length > 0 ? (
          <div className="centered">
            <Typography>Solicitações</Typography>
            <TableContainer component={Paper}>
              <Table aria-label=" table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Parcela</StyledTableCell>
                    <StyledTableCell align="right">Juros da parcela</StyledTableCell>
                    <StyledTableCell align="right">Valor da parcela</StyledTableCell>
                    <StyledTableCell align="right">Valor Total</StyledTableCell>
                    <StyledTableCell align="right">Comissão parceiro</StyledTableCell>
                    <StyledTableCell align="right">Ações</StyledTableCell>
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
                      <StyledTableCell align="right">
                        <Link to={`/solicitation/detail/${solicitation.id}`}>
                          <VisibilityIcon  color="primary"/>
                        </Link>{' '}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <Typography>Ainda não existem solicitações pendentes</Typography>
        )}
      </Box>
    </Container>
  );
}
