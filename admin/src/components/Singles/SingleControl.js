import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getSingles} from '../../actions/singleActions';

// Material-ui
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
  const {setPage, getSingles} = props;

  const onLoadSingles = () => {
    setPage('List');
    getSingles();
  };

  const onAddSingle = () => {
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
        onClick={onLoadSingles}
      >
        Load Singles
      </Button>

      <Button
        variant='contained'
        size='small'
        color='secondary'
        className={classes.button}
        startIcon={<AddCircleIcon />}
        onClick={onAddSingle}
      >
        Add Single
      </Button>
    </React.Fragment>
  );
}

ArtistControl.propTypes = {
  getSingles: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default connect(null, {getSingles})(withRouter(ArtistControl));
