import React, {useState} from 'react';

import PlaylistControl from './PlaylistControl';
import PlaylistList from './PlaylistList';
import PlaylistEdit from './PlaylistEdit';
// MUI
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

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

const Playlists = () => {
  const classes = useStyles();
  const [page, setPage] = useState('List');
  const [playlist, setPlaylist] = useState({});

  const renderSwitch = page => {
    switch (page) {
      case 'List':
        return <PlaylistList setPlaylist={setPlaylist} setPage={setPage} />;
      case 'Add':
        return <PlaylistEdit playlist={{}} />;
      case 'Edit':
        return <PlaylistEdit playlist={playlist} />;
      default:
        return <PlaylistList />;
    }
  };

  return (
    <Grid item xs={12}>
      <Paper className={classes.controlPanel}>
        <PlaylistControl setPage={setPage} />
      </Paper>
      {renderSwitch(page)}
    </Grid>
  );
};

export default Playlists;
