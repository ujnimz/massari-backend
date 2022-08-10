import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// Redux
import {getGenres, clearGenres, deleteGenre} from '../../actions/genreActions';
// MUI Data Grid
import VirtualizedGrid from '../Elements/VirtualizedGrid';
// MUI
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

const useStyles = makeStyles(theme => ({
  loadingPaper: {
    height: 600,
    overflow: 'hidden',
  },
  loadingText: {
    textAlign: 'center',
  },
  deleteIcon: {
    color: theme.palette.error.main,
  },
  genreColorBox: {
    width: 150,
    textAlign: 'center',
    color: theme.palette.secondary.contrastText,
  },
  editButtons: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexGrow: 1,
  },
}));

const GenreList = props => {
  const classes = useStyles();
  const {
    getGenres,
    clearGenres,
    genres,
    deleteGenre,
    setPage,
    setGenre,
  } = props;

  useEffect(() => {
    getGenres();
    return () => {
      clearGenres();
    };
  }, [getGenres, clearGenres]);

  const deleteAction = id => {
    deleteGenre(id);
  };

  const editAction = genre => {
    setPage('Edit');
    setGenre(genre);
  };

  const makeRows = genresList => {
    const rows = [];

    for (let i = 0; i < genresList.length; i += 1) {
      const row = {
        id: i,
        index: i + 1,
        title: genresList[i].title,
        color: genresList[i].color,
        date: new Date(genresList[i].date).toDateString(),
        published: genresList[i].published,
        actions: genresList[i],
      };

      rows.push(row);
    }
    return rows;
  };

  const makeColumns = () => {
    const columns = [
      {
        field: 'id',
        hide: true,
      },
      {
        field: 'index',
        headerName: '#',
        width: 50,
      },
      {
        field: 'title',
        headerName: 'Title',
        width: 220,
      },
      {
        field: 'color',
        headerName: 'Color',
        width: 200,
        renderCell: function color(params) {
          <Chip
            label={params.value}
            className={classes.genreColorBox}
            style={{backgroundColor: params.value}}
          />;
        },
      },
      {
        field: 'date',
        headerName: 'Date',
        width: 200,
      },
      {
        field: 'published',
        headerName: 'Status',
        width: 100,
        renderCell: function status(params) {
          params.value ? (
            <CheckCircleIcon style={{color: green.A400}} />
          ) : (
            <NotInterestedIcon style={{color: green[500]}} />
          );
        },
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        renderCell: function actions(params) {
          <div className={classes.editButtons}>
            <IconButton
              onClick={() => editAction(params.value)}
              color='secondary'
              aria-label='Edit Button'
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => deleteAction(params.value._id)}
              className={classes.deleteIcon}
              aria-label='Delete Button'
            >
              <DeleteForeverIcon />
            </IconButton>
          </div>;
        },
      },
    ];

    return columns;
  };

  return (
    <>
      <Typography
        component='h1'
        variant='h5'
        gutterBottom={true}
        color='inherit'
        noWrap
        className={classes.title}
      >
        Genres
      </Typography>

      <VirtualizedGrid
        isLoading={genres.loading ? true : false}
        rows={makeRows(genres.genresList)}
        columns={makeColumns()}
      />
    </>
  );
};

GenreList.propTypes = {
  getGenres: PropTypes.func.isRequired,
  clearGenres: PropTypes.func.isRequired,
  deleteGenre: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  setGenre: PropTypes.func.isRequired,
  genres: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  genres: state.genres,
});

export default connect(mapStateToProps, {
  getGenres,
  clearGenres,
  deleteGenre,
})(GenreList);
