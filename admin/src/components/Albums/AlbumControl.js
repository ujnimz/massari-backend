import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// Redux
import {getAlbums} from '../../actions/albumActions';
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

const AlbumControl = props => {
  const classes = useStyles();
  const {setPage, getAlbums} = props;

  const onLoadAlbums = () => {
    setPage('List');
    getAlbums();
  };

  const onAddAlbum = () => {
    setPage('Add');
  };

  return (
    <React.Fragment>
      <Button
        variant='contained'
        size='small'
        color='secondary'
        className={classes.button}
        startIcon={<CloudDownloadIcon />}
        onClick={onLoadAlbums}
      >
        Load Albums
      </Button>

      <Button
        variant='contained'
        size='small'
        color='secondary'
        className={classes.button}
        startIcon={<AddCircleIcon />}
        onClick={onAddAlbum}
      >
        Add Album
      </Button>
    </React.Fragment>
  );
};

AlbumControl.propTypes = {
  getAlbums: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default connect(null, {getAlbums})(withRouter(AlbumControl));
