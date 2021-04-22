import { Box, Button, Container, Grid, TextField } from '@material-ui/core/';
import React, { useContext } from 'react';

import Card from '../../Card';
import GlobalState from '../../../contexts/';
import api from '../../../services/index';
import { useSnackbar } from 'notistack';

export default function Index() {
  const [state, setState] = useContext(GlobalState);
  const { enqueueSnackbar } = useSnackbar();

  if (state.currentStep !== 2) {
    // Prop: The current step
    return null;
  }

  async function searcheForClient(e) {
    e.preventDefault();

    try {
      let response = await api.get(`api/v1/client/get_user/?cpf=${state.cpfClientSearched}`);

      let { data, status } = response;

      // console.log(data, status);
      // console.log(data.length);

      if (status !== 200) {
        enqueueSnackbar(`CPF inexistente na nossa base de dados confira os dados preenchidos.`, {
          variant: 'error',
        });
        return;
      }

      setState((state) => ({ ...state, clientSearchedData: data }));
    } catch (error) {
      console.error(error);

      enqueueSnackbar(`Erro ao buscar dados do cliente.`, {
        variant: 'error',
      });
    }
  }

  return (
    <Container className={``}>
      <Box display="flex" style={{ marginTop: '14em' }} justifyContent="center" m={1} p={1} bgcolor="background.paper">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <form action="" onSubmit={searcheForClient}>
              <TextField
                value={state.cpfClientSearched}
                id="outlined-basic"
                label="Busque o cliente"
                variant="outlined"
                onChange={(e) =>
                  setState((state) => ({
                    ...state,
                    cpfClientSearched: e.target.value,
                  }))
                }
              />

              <Button type="submit" style={{ height: '3.9em' }} variant="contained" color="secondary">
                Buscar
              </Button>
            </form>
          </Grid>
          <br />
          <br />
          <Grid item xs={12}>
            {state.clientSearchedData.length > 0 && (
              <Card>
                <h3>Cliente encontrado:</h3>

                <p>{state.clientSearchedData[0].cpf}</p>

                <p>{state.clientSearchedData[0].name} </p>
              </Card>
            )}{' '}
          </Grid>
        </Grid>
      </Box>
      <br />
      <hr />
      <br />
    </Container>
  );
}
