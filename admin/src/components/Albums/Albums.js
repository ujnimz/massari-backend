import React, {useState} from 'react';

import AlbumControl from './AlbumControl';
// MUI
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import AlbumList from './AlbumList';
import AlbumEdit from './AlbumEdit';

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

const Albums = () => {
  const classes = useStyles();
  const [page, setPage] = useState('List');
  const [album, setAlbum] = useState({});

  const renderSwitch = page => {
    switch (page) {
      case 'List':
        return <AlbumList setAlbum={setAlbum} setPage={setPage} />;
      case 'Add':
        return <AlbumEdit album={{}} />;
      case 'Edit':
        return <AlbumEdit album={album} />;
      default:
        return <AlbumList />;
    }
  };

  return (
    <Grid item xs={12}>
      <Paper className={classes.controlPanel}>
        <AlbumControl setPage={setPage} />
      </Paper>
      {renderSwitch(page)}
    </Grid>
  );
};

export default Albums;
