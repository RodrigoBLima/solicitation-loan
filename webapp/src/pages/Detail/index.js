import { Button, Container, Grid, Paper } from '@material-ui/core/';
import React, { useEffect, useState } from 'react';

import Card from '../../components/Card';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import StorageIcon from '@material-ui/icons/Storage';
import SubHeader from '../../components/SubHeader';
import api from '../../services/index';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';

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
}));

export default function Index() {
  const classes = useStyles();
  const params = useParams();

  const [solicitationDetail, setSolicitationDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSolicitationDetail();
  }, []);

  async function getSolicitationDetail() {
    try {
      let response = await api.get(`/api/v1/solicitation/${params.id}`);

      let { data } = response;

      setSolicitationDetail(data);

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={classes.root}>
      <Container>
        <br />
        <SubHeader>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <StorageIcon color="secondary" />
                <span className={classes.span}>Detalhe de solicitação</span>
              </Paper>
            </Grid>
          </Grid>
        </SubHeader>
        {loading ? (
          <h3 style={{ align: 'center' }}> </h3>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <h6>Solicitação gerada por Sistema</h6>
              </Paper>
              <br />
              <Paper className={classes.paper}>
                <p>Valor total</p>

                <p style={{ color: '#03fc49' }}>R$ {solicitationDetail.totalLoan}</p>
              </Paper>
              <br />
              <Paper className={classes.paper}>
                <p>Valor a depositar</p>

                <p style={{ color: '#03fc49' }}>R$ {solicitationDetail.desiredValue}</p>
              </Paper>
              <br />
              <Paper>
                <p>Frente do cartão</p>

                <p style={{ color: '#03fc49' }}>
                  <InsertDriveFileIcon fontSize={'large'} color="secondary" />
                </p>

                <a href="#">Ver comprovante</a>
              </Paper>
              <br />
              <Paper>
                <p>Verso do cartão</p>

                <p style={{ color: '#03fc49' }}>
                  <InsertDriveFileIcon fontSize={'large'} color="secondary" />
                </p>

                <a href="#">Ver comprovante</a>
              </Paper>
              <br />
              <Paper>
                <p>Selfie com cartão</p>

                <p style={{ color: '#03fc49' }}>
                  <InsertDriveFileIcon fontSize={'large'} color="secondary" />
                </p>

                <a href="#">Ver comprovante</a>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <h6>Fluxo da solicitação: Manual</h6>
              </Paper>
              <br />
              <Paper>
                <h6>Modalidade</h6>

                <p>Cartão de crédito</p>

                <p>Número do cartão: {solicitationDetail.cardNumber}</p>
                <p>
                  Validade:
                  {solicitationDetail.client.dt_valid}
                </p>

                <p>CVC: {solicitationDetail.client.cvc}</p>

                <p>
                  {solicitationDetail.installmentValue} parcela de{' '}
                  <em style={{ color: '#03fc49' }}>R$: {solicitationDetail.installmentInterestValue}</em>
                </p>
                <p>Tabela: {solicitationDetail.table.name}</p>
              </Paper>
              <br />
              <Card>
                <h6>Informações do cliente</h6>

                <p>Nome: {solicitationDetail.client.name}</p>

                <p>CPF: {solicitationDetail.client.cpf}</p>
                <p>Agência: {solicitationDetail.client.bank.label}</p>
                <p>Banco: {solicitationDetail.client.bank.label}</p>
                <p>Tipo de conta: {solicitationDetail.client.bank.accountTypeLabel}</p>
                <p>Número da conta: {solicitationDetail.client.bank.accountNumber}</p>
              </Card>
              <br />
              <Card>
                <h6>Informações gerais</h6>

                <p>Data: {solicitationDetail.client.dt_valid}</p>

                <Button variant="contained" color="secondary">
                  Aguardando
                </Button>
                <Button variant="contained" color="primary">
                  Pré aprovar
                </Button>
                <Button variant="contained" color="default">
                  Reprovar
                </Button>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
}
