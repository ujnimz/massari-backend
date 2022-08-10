import React from 'react';

import SignUp from '../components/User/SignUp';
import Login from '../components/User/Login';

// material-ui
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <Login />
        <SignUp />
      </Paper>
    </Grid>
  );
};

export default Home;
