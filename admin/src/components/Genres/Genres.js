import React, {useState} from 'react';
// MUI
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

import GenreList from './GenreList';
import GenreEdit from './GenreEdit';
import GenreControl from './GenreControl';

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

const Genres = () => {
  const classes = useStyles();
  const [page, setPage] = useState('List');
  const [genre, setGenre] = useState({});

  const renderSwitch = page => {
    switch (page) {
      case 'List':
        return <GenreList setGenre={setGenre} setPage={setPage} />;
      case 'Add':
        return <GenreEdit genre={{}} />;
      case 'Edit':
        return <GenreEdit genre={genre} />;
      default:
        return <GenreList />;
    }
  };

  return (
    <Grid item xs={12}>
      <Paper className={classes.controlPanel}>
        <GenreControl setPage={setPage} />
      </Paper>
      {renderSwitch(page)}
    </Grid>
  );
};

export default Genres;
