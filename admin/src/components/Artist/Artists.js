import React, {useState} from 'react';

import ArtistControl from './ArtistControl';

// MUI
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import ArtistsList from './ArtistsList';
import ArtistEdit from './ArtistEdit';

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

const Artists = () => {
  const classes = useStyles();
  const [page, setPage] = useState('List');
  const [artist, setArtist] = useState({});

  const renderSwitch = page => {
    switch (page) {
      case 'List':
        return <ArtistsList setArtist={setArtist} setPage={setPage} />;
      case 'Add':
        return <ArtistEdit artist={{}} />;
      case 'Edit':
        return <ArtistEdit artist={artist} />;
      default:
        return <ArtistsList />;
    }
  };

  return (
    <Grid item xs={12}>
      <Paper className={classes.controlPanel}>
        <ArtistControl setPage={setPage} />
      </Paper>
      {renderSwitch(page)}
    </Grid>
  );
};

export default Artists;
