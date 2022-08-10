import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// Redux
import {getArtists} from '../../actions/artistActions';
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

function ArtistControl(props) {
  const classes = useStyles();
  const {setPage, getArtists} = props;

  const onAddArtist = () => {
    setPage('Add');
  };

  const onLoadArtists = () => {
    setPage('List');
    getArtists();
  };

  return (
    <React.Fragment>
      <Button
        variant='contained'
        size='small'
        color='secondary'
        className={classes.button}
        startIcon={<CloudDownloadIcon />}
        onClick={onLoadArtists}
      >
        Load Artists
      </Button>

      <Button
        variant='contained'
        size='small'
        color='secondary'
        className={classes.button}
        startIcon={<AddCircleIcon />}
        onClick={onAddArtist}
      >
        Add Artist
      </Button>
    </React.Fragment>
  );
}

ArtistControl.propTypes = {
  getArtists: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default connect(null, {getArtists})(withRouter(ArtistControl));
