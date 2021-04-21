import { Button, TextField } from "@material-ui/core/";
import React, { useContext } from "react";

import Card from "../../Card";
import GlobalState from "../../../contexts/";
import api from "../../../services/index";
import { useSnackbar } from "notistack";

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
      let response = await api.get(
        `api/v1/client/get_user/?cpf=${state.cpfClientSearched}`
      );

      let { data } = response;

      // console.log(data, status);
      // console.log(data.length);

      if (data.length === 0) {
        enqueueSnackbar(
          `CPF inexistente na nossa base de dados confira os dados preenchidos.`,
          {
            variant: "error",
          }
        );
        return;
      }

      setState((state) => ({ ...state, clientSearchedData: data }));
    } catch (error) {
      console.error(error);

      enqueueSnackbar(`Erro ao buscar dados do cliente.`, {
        variant: "error",
      });
    }
  }

  return (
    <div>
      <form action="" onSubmit={searcheForClient}>
        <TextField
          value={state.cpfClientSearched}
          id="outlined-basic"
          label="Busque o cliente"
          onChange={(e) =>
            setState((state) => ({
              ...state,
              cpfClientSearched: e.target.value,
            }))
          }
        />

        <Button type="submit" variant="contained" color="secondary">
          Buscar
        </Button>
      </form>
      {state.clientSearchedData.length > 0 && (
        <Card>
          <h3>Cliente encontrado:</h3>

          <p>{state.clientSearchedData[0].cpf}</p>

          <p>{state.clientSearchedData[0].name} </p>
        </Card>
      )}{" "}
    </div>
  );
}
