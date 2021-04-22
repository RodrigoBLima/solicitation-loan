import { Box, Button, Container, Grid, Paper } from '@material-ui/core/';
import React, { useContext } from 'react';

import GlobalState from '../../../contexts/';
import SubHeader from '../../SubHeader';
import { makeStyles } from '@material-ui/core/styles';

// eslint-disable-next-line
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
  paperTitle: {
    height: 60,
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
  // eslint-disable-next-line
  const [state, setState] = useContext(GlobalState);
  const classes = useStyles();

  if (state.currentStep !== 4) {
    // Prop: The current step
    return null;
  }

  return (
    <Container>
      <br />

      <SubHeader>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paperTitle}>
              <span className={classes.span}>Solicitar empréstimo</span>
            </Paper>
          </Grid>
        </Grid>
      </SubHeader>

      <Box display="flex" style={{ marginTop: '10em' }} justifyContent="center" m={1} p={1} bgcolor="background.paper">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" bgcolor="background.paper">
              <Button variant="contained" color="primary">
                Cartão de crédito
              </Button>
            </Box>
            <Box display="flex" justifyContent="center" bgcolor="background.paper">
              <em style={{ align: 'center' }}>ou</em>
            </Box>
            <Box display="flex" justifyContent="center" bgcolor="background.paper">
              <Button variant="contained" color="primary" disabled>
                Crédito consignado
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <br />
      <hr />
      <br />
    </Container>
  );
}
