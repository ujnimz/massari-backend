import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// MUI Data Grid
import VirtualizedGrid from '../Elements/VirtualizedGrid';
// MUI
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PublicIcon from '@material-ui/icons/Public';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import {
  getPlaylists,
  clearPlaylists,
  deletePlaylist,
} from '../../actions/playlistActions';

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

const PlaylistList = props => {
  const classes = useStyles();
  const {
    playlists,
    getPlaylists,
    clearPlaylists,
    deletePlaylist,
    setPage,
    setPlaylist,
  } = props;

  useEffect(() => {
    getPlaylists();
    return () => {
      clearPlaylists();
    };
  }, [getPlaylists, clearPlaylists]);

  const deleteAction = id => {
    deletePlaylist(id);
  };

  const editAction = playlist => {
    setPage('Edit');
    setPlaylist(playlist);
  };

  const makeRows = playlistsList => {
    const rows = [];

    for (let i = 0; i < playlistsList.length; i += 1) {
      const row = {
        id: i,
        index: i + 1,
        title: playlistsList[i].title,
        image: playlistsList[i].image,
        genres: playlistsList[i].songs,
        likes: playlistsList[i].likes,
        songsCount: playlistsList[i].songs.length,
        date: new Date(playlistsList[i].date).toDateString(),
        public: playlistsList[i].public,
        actions: playlistsList[i],
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
        width: 350,
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
        field: 'likes',
        headerName: 'Likes',
        type: 'number',
        width: 90,
      },
      {
        field: 'songsCount',
        headerName: 'Songs #',
        type: 'number',
        width: 90,
      },
      {
        field: 'date',
        headerName: 'Date',
        width: 180,
      },
      {
        field: 'public',
        headerName: 'Status',
        width: 80,
        renderCell: function status(params) {
          params.value ? (
            <PublicIcon color='secondary' />
          ) : (
            <AccountCircleIcon color='secondary' />
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
        Playlists
      </Typography>

      <VirtualizedGrid
        isLoading={playlists.loading}
        rows={makeRows(playlists.playlistsList)}
        columns={makeColumns()}
      />
    </>
  );
};

PlaylistList.propTypes = {
  getPlaylists: PropTypes.func.isRequired,
  clearPlaylists: PropTypes.func.isRequired,
  deletePlaylist: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  setPlaylist: PropTypes.func.isRequired,
  playlists: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  playlists: state.playlists,
});

export default connect(mapStateToProps, {
  getPlaylists,
  clearPlaylists,
  deletePlaylist,
})(PlaylistList);
