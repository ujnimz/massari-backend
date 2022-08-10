import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// MUI Data Grid
import VirtualizedGrid from '../Elements/VirtualizedGrid';
// MUI
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

import {getAlbums, clearAlbums, deleteAlbum} from '../../actions/albumActions';

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
  editButtons: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexGrow: 1,
  },
}));

const AlbumList = props => {
  const classes = useStyles();
  const {
    albums,
    getAlbums,
    clearAlbums,
    deleteAlbum,
    setPage,
    setAlbum,
  } = props;

  useEffect(() => {
    getAlbums();
    return () => {
      clearAlbums();
    };
  }, [getAlbums, clearAlbums]);

  const deleteAction = id => {
    deleteAlbum(id);
  };

  const editAction = album => {
    setPage('Edit');
    setAlbum(album);
  };

  const makeRows = albumsList => {
    const rows = [];

    for (let i = 0; i < albumsList.length; i += 1) {
      const row = {
        id: i,
        index: i + 1,
        title: albumsList[i].title,
        image: albumsList[i].image,
        genres: albumsList[i].genres,
        likes: albumsList[i].likes,
        tracksCount: albumsList[i].tracks.length,
        date: new Date(albumsList[i].date).toDateString(),
        published: albumsList[i].published,
        actions: albumsList[i],
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
        width: 200,
      },
      {
        field: 'image',
        headerName: 'Image',
        width: 80,
        renderCell: function image(params) {
          <Avatar alt='Avatar' src={params.value} />;
        },
      },
      {
        field: 'genres',
        headerName: 'Genres',
        width: 250,
        renderCell: function genres(params) {
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {params.value.map(genre => (
              <Chip
                key={genre.value}
                style={{marginRight: 2, marginBottom: 2, fontSize: 10}}
                size='small'
                label={genre.label}
              />
            ))}
          </div>;
        },
      },
      {
        field: 'likes',
        headerName: 'Likes',
        type: 'number',
        width: 90,
      },
      {
        field: 'tracksCount',
        headerName: 'Tracks #',
        type: 'number',
        width: 90,
      },
      {
        field: 'date',
        headerName: 'Date',
        width: 180,
      },
      {
        field: 'published',
        headerName: 'Status',
        width: 80,
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
        Albums
      </Typography>

      <VirtualizedGrid
        isLoading={albums.loading}
        rows={makeRows(albums.albumsList)}
        columns={makeColumns()}
      />
    </>
  );
};

AlbumList.propTypes = {
  getAlbums: PropTypes.func.isRequired,
  clearAlbums: PropTypes.func.isRequired,
  deleteAlbum: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  setAlbum: PropTypes.func.isRequired,
  albums: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  albums: state.albums,
});

export default connect(mapStateToProps, {
  getAlbums,
  clearAlbums,
  deleteAlbum,
})(AlbumList);
