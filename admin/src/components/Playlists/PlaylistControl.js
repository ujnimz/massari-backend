import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// Redux
import {getPlaylists} from '../../actions/playlistActions';
// MUI
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const PlaylistControl = props => {
  const classes = useStyles();
  const {setPage, getPlaylists} = props;

  const onLoadPlaylist = () => {
    setPage('List');
    getPlaylists();
  };

  const onAddPlaylist = () => {
    setPage('Add');
  };

  return (
    <>
      <Button
        variant='contained'
        size='small'
        color='secondary'
        className={classes.button}
        startIcon={<CloudDownloadIcon />}
        onClick={onLoadPlaylist}
      >
        Load Playlists
      </Button>

      <Button
        variant='contained'
        size='small'
        color='secondary'
        className={classes.button}
        startIcon={<AddCircleIcon />}
        onClick={onAddPlaylist}
      >
        Add Playlist
      </Button>
    </>
  );
};

PlaylistControl.propTypes = {
  getPlaylists: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default connect(null, {getPlaylists})(withRouter(PlaylistControl));
