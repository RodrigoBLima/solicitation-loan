import { Button, Container, Grid } from '@material-ui/core/';
import React, { useContext, useEffect } from 'react';

import GlobalState from '../../contexts/';
import StepFive from '../../components/Steps/StepFive';
import StepFour from '../../components/Steps/StepFour';
import StepOne from '../../components/Steps/StepOne';
import StepSix from '../../components/Steps/StepSix';
import StepThree from '../../components/Steps/StepThree';
import StepTwo from '../../components/Steps/StepTwo';

export default function Index() {
  const [state, setState] = useContext(GlobalState);

  useEffect(() => {
    setState((state) => ({
      ...state,
      currentStep: 6,
      rateTableData: [],
      rateTableSelected: [],
      installmentSelected: [],
      clientSearchedData: [],
    }));
  }, []);

  // _next and _previous functions will be called on button click
  function _next() {
    let currentStep = state.currentStep;
    currentStep = currentStep >= 4 ? 5 : currentStep + 1;

    setState((state) => ({ ...state, currentStep: currentStep }));
  }

  function _prev() {
    let currentStep = state.currentStep;
    // If the current step is 4 or 5, then subtract one on "previous" button click
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;

    setState((state) => ({ ...state, currentStep: currentStep }));
  }

  // function previousButton() {
  //   let currentStep = state.currentStep;

  //   if (currentStep > 5) {
  //     return null;
  //   }
  //   // If the current step is not 1, then render the "previous" button
  //   if (currentStep !== 1) {
  //     return (
  //       <Button type="submit" variant="contained" onClick={_prev}>
  //         Voltar
  //       </Button>
  //     );
  //   }
  //   return null;
  // }

  // function nextButton() {
  //   let currentStep = state.currentStep;
  //   let disabled = state.value ? false : true;

  //   // If the current step is not 5, then render the "next" button
  //   if (currentStep < 5) {
  //     return (
  //       <Button type="submit" variant="contained" color="secondary" onClick={_next} disabled={disabled}>
  //         {currentStep === 2 ? 'Solicitar' : 'Avançar'}
  //       </Button>
  //     );
  //   }
  //   // ...else render nothing
  //   return null;
  // }

  function renderButtons() {
    let currentStep = state.currentStep;
    let disabled = state.value ? false : true;

    if (currentStep > 5) {
      return null;
    }

    return (
      <Container>
        <Grid container spacing={5}>
          <Grid xs={6} align-items-xs-center justify-xs-flex-end>
            {currentStep !== 1 && (
              <Button type="submit" variant="contained" onClick={_prev}>
                Voltar
              </Button>
            )}
          </Grid>
          <Grid xs={6} align-items-xs-center justify-xs-flex-end>
            {currentStep < 5 && (
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                onClick={_next}
                disabled={disabled}
                style={{ float: 'right' }}
              >
                {currentStep === 2 ? 'Solicitar' : 'Avançar'}
              </Button>
            )}
          </Grid>
        </Grid>
      </Container>
    );
  }
  return (
    <div>
      <Container>
        <StepOne />
        <StepTwo />
        <StepThree />
        <StepFour />
        <StepFive />
        <StepSix />
        <br />
        <br />
        <>{renderButtons()}</>
      </Container>
    </div>
  );
}
