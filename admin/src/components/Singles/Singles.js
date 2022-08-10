import React, {useState} from 'react';

import SingleControl from './SingleControl';

// MUI
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import SingleList from './SingleList';
import SingleEdit from './SingleEdit';

const useStyles = makeStyles(() => ({
  loadingPaper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 800,
    width: '100%',
  },
  loadingText: {
    textAlign: 'center',
  },
  controlPanel: {
    marginBottom: 15,
  },
}));

const Singles = () => {
  const classes = useStyles();
  const [page, setPage] = useState('List');
  const [single, setSingle] = useState({});

  const renderSwitch = page => {
    switch (page) {
      case 'List':
        return <SingleList setSingle={setSingle} setPage={setPage} />;
      case 'Add':
        return <SingleEdit single={{}} />;
      case 'Edit':
        return <SingleEdit single={single} />;
      default:
        return <SingleList />;
    }
  };

  return (
    <Grid item xs={12}>
      <Paper className={classes.controlPanel}>
        <SingleControl setPage={setPage} />
      </Paper>
      {renderSwitch(page)}
    </Grid>
  );
};

export default Singles;
