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
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

import {
  clearSingles,
  deleteSingle,
  getSingles,
} from '../../actions/singleActions';
import {
  addTrack,
  removeTrack,
  setCurTrack,
  setPlay,
  setPause,
} from '../../actions/playerActions';

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

const SingleList = props => {
  const classes = useStyles();
  const {
    singles,
    player,
    clearSingles,
    deleteSingle,
    getSingles,
    setPage,
    setSingle,
    addTrack,
    removeTrack,
    setCurTrack,
    setPlay,
    setPause,
  } = props;

  useEffect(() => {
    getSingles();
    return () => {
      clearSingles();
    };
  }, [getSingles, clearSingles]);

  const deleteAction = id => {
    deleteSingle(id);
  };

  const editAction = single => {
    setPage('Edit');
    setSingle(single);
  };

  const onPlayTrack = track => {
    if (!player.playList.includes(track)) {
      addTrack(track);
    }
    setCurTrack(track._id);
    setPlay();
  };

  const onAddTrack = track => {
    if (!player.playList.includes(track)) {
      addTrack(track);
    }
    if (player.playList.length === 0) {
      setCurTrack(track._id);
      setPlay(); // Optional
    }
  };

  const onPauseTrack = () => {
    setPause();
  };

  const makeRows = singleList => {
    const rows = [];

    for (let i = 0; i < singleList.length; i += 1) {
      const row = {
        id: i,
        index: i + 1,
        title: singleList[i].title,
        image: singleList[i].image,
        genres: singleList[i].genres,
        likes: singleList[i].likes,
        date: new Date(singleList[i].date).toDateString(),
        published: singleList[i].published,
        actions: singleList[i],
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
        width: 250,
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
        width: 200,
        renderCell: function actions(params) {
          <div className={classes.editButtons}>
            {player.track._id === params.value._id && player.play ? (
              <IconButton
                onClick={() => onPauseTrack()}
                color='secondary'
                aria-label='Play Button'
              >
                <PauseCircleOutlineIcon />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => onPlayTrack(params.value)}
                color='secondary'
                aria-label='Play Button'
              >
                <PlayCircleOutlineIcon />
              </IconButton>
            )}

            {player.playList.findIndex(
              item => item._id === params.value._id,
            ) !== -1 ? (
              <IconButton
                onClick={() => removeTrack(params.value._id)}
                color='secondary'
                aria-label='Remove from Player Button'
              >
                <PlaylistAddCheckIcon />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => onAddTrack(params.value)}
                color='secondary'
                aria-label='Add to Player Button'
              >
                <PlaylistAddIcon />
              </IconButton>
            )}

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
        Singles
      </Typography>

      <VirtualizedGrid
        isLoading={singles.loading}
        rows={makeRows(singles.singlesList)}
        columns={makeColumns()}
      />
    </>
  );
};

SingleList.propTypes = {
  deleteSingle: PropTypes.func.isRequired,
  clearSingles: PropTypes.func.isRequired,
  getSingles: PropTypes.func.isRequired,
  addTrack: PropTypes.func.isRequired,
  setCurTrack: PropTypes.func.isRequired,
  setPlay: PropTypes.func.isRequired,
  setPause: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  setSingle: PropTypes.func.isRequired,
  removeTrack: PropTypes.func.isRequired,
  singles: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  singles: state.singles,
  player: state.player,
});

export default connect(mapStateToProps, {
  clearSingles,
  deleteSingle,
  getSingles,
  addTrack,
  removeTrack,
  setCurTrack,
  setPlay,
  setPause,
})(SingleList);
