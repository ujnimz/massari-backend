import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// Redux
import {getGenres} from '../../actions/genreActions';

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

function GenreControl(props) {
  const classes = useStyles();
  const {setPage, getGenres} = props;

  const onAddGenre = () => {
    setPage('Add');
  };

  const onLoadGenres = () => {
    setPage('List');
    getGenres();
  };

  return (
    <React.Fragment>
      <Button
        variant='contained'
        size='small'
        color='secondary'
        className={classes.button}
        startIcon={<CloudDownloadIcon />}
        onClick={onLoadGenres}
      >
        Load Genres
      </Button>

      <Button
        variant='contained'
        size='small'
        color='secondary'
        className={classes.button}
        startIcon={<AddCircleIcon />}
        onClick={onAddGenre}
      >
        Add Genre
      </Button>
    </React.Fragment>
  );
}

GenreControl.propTypes = {
  getGenres: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default connect(null, {getGenres})(withRouter(GenreControl));
