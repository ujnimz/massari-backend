import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  setLoading,
  setPlay,
  setPause,
  setRepeat,
  setNextTrack,
  setPreviousTrack,
  setDuration,
  shufflePlaylist,
} from '../../actions/playerActions';

import PlayListTable from './PlayListTable';

import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import RepeatIcon from '@material-ui/icons/Repeat';
import ShuffleIcon from '@material-ui/icons/Shuffle';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 15,
  },
  contorlsBar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexGrow: 1,
  },
  cover: {
    width: 60,
    display: 'block',
    marginRight: 15,
  },
  mainControls: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  subControls: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 380,
  },
  volume: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 200,
  },
  volbar: {
    width: '100%',
    marginLeft: 5,
    marginRight: 5,
    cursor: 'pointer',
    animationDuration: '10000ms',
  },
  songTitle: {
    fontSize: 14,
    marginTop: 0,
    marginBottom: 0,
  },
  songArtists: {
    fontSize: 11,
  },
  progressBar: {
    width: '100%',
    marginTop: 20,
    cursor: 'pointer',
    animationDuration: '200ms',
  },
  time: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
  },
  icon: {
    cursor: 'pointer',
  },
}));

const AudioPlayer = props => {
  const classes = useStyles();

  const [volume, setVolume] = useState(50);
  const [curTime, setCurTime] = useState(0);
  const [progress, setProgress] = useState(0);

  const {
    setLoading,
    setPlay,
    setPause,
    setRepeat,
    setNextTrack,
    setPreviousTrack,
    setDuration,
    shufflePlaylist,
    player,
  } = props;

  const {track, play} = player;

  useEffect(() => {
    if (Object.keys(track).length !== 0) {
      setLoading();
      const audio = document.getElementById('audio');
      audio.src = track.uri;
      audio.volume = 0.5;
      audio.addEventListener(
        'loadeddata',
        async () => {
          setDuration(audio.duration);
          setCurTime(audio.currentTime);
          play ? audio.play() : audio.pause();
        },
        false,
      );
      audio.addEventListener('timeupdate', () => {
        setCurTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
      });
      audio.addEventListener('ended', () => {
        audio.pause();
        setNextTrack(track._id);
      });
    }
  }, [
    track,
    play,
    setLoading,
    setDuration,
    setCurTime,
    setProgress,
    setNextTrack,
  ]);

  const onPlay = () => {
    if (Object.keys(player.track).length !== 0) {
      const audio = document.getElementById('audio');
      audio.play();
      setPlay();
    }
  };

  const onPause = () => {
    if (Object.keys(player.track).length !== 0) {
      const audio = document.getElementById('audio');
      audio.pause();
      setPause();
    }
  };

  const onNext = () => {
    setNextTrack(player.track._id);
  };

  const onPrevious = () => {
    setPreviousTrack(player.track._id);
  };

  const onShaffle = () => {
    shufflePlaylist(player.shuffle);
  };

  const onRepeat = () => {
    setRepeat();
  };

  const onVolUp = () => {
    let newVol = volume + 10;
    setVolume(newVol < 100 ? (newVol > 0 ? newVol : 0) : 100);
    const audio = document.getElementById('audio');
    audio.volume = (newVol < 100 ? (newVol > 0 ? newVol : 0) : 100) / 100;
  };

  const onVolDown = () => {
    let newVol = volume - 10;
    setVolume(newVol > 0 ? (newVol < 100 ? newVol : 100) : 0);
    const audio = document.getElementById('audio');
    audio.volume = (newVol > 0 ? (newVol < 100 ? newVol : 100) : 0) / 100;
  };

  const formatTime = time => {
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = '';
    if (hrs > 0) {
      ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
    }
    ret += '' + mins + ':' + (secs < 10 ? '0' : '');
    ret += '' + secs;
    return ret;
  };

  function calcClickedTime(e) {
    const clickPositionInPage = e.pageX;
    const bar = document.querySelector('#progressBar');
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = player.duration / barWidth;
    return timePerPixel * clickPositionInBar;
  }

  function handleTimeDrag(e) {
    const audio = document.getElementById('audio');
    audio.currentTime = calcClickedTime(e);

    const updateTimeOnMove = eMove => {
      const audio = document.getElementById('audio');
      audio.currentTime = calcClickedTime(eMove);
    };

    document.addEventListener('mousemove', updateTimeOnMove);

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', updateTimeOnMove);
    });
  }

  function calcClickedVol(e) {
    const clickPositionInPage = e.pageX;
    const bar = document.querySelector('#volumeBar');
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const volumePerPixel = 100 / barWidth;
    let newVol = volumePerPixel * clickPositionInBar;
    return newVol < 100 ? (newVol > 0 ? newVol : 0) : 100;
  }

  function handleVolDrag(e) {
    const audio = document.getElementById('audio');
    audio.volume = calcClickedVol(e) / 100;
    setVolume(calcClickedVol(e));

    const updateVolOnMove = eMove => {
      const audio = document.getElementById('audio');
      audio.volume = calcClickedVol(eMove) / 100;
      setVolume(calcClickedVol(eMove));
    };

    document.addEventListener('mousemove', updateVolOnMove);

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', updateVolOnMove);
    });
  }

  return (
    <>
      {player.playList.length === 0 ? '' : <PlayListTable />}
      <Card className={classes.root}>
        <audio id='audio' preload='metadata'>
          Your browser does not support the <code>audio</code> element.
        </audio>
        <div className={classes.contorlsBar}>
          <div className={classes.details}>
            <img
              className={classes.cover}
              src={
                Object.keys(player.track).length === 0 ? '' : player.track.image
              }
              alt={
                Object.keys(player.track).length === 0 ? '' : player.track.title
              }
            />
            <div>
              <h2 className={classes.songTitle}>
                {Object.keys(player.track).length === 0
                  ? '...'
                  : player.track.title}
              </h2>
              <span className={classes.songArtists}>
                {Object.keys(player.track).length === 0
                  ? '...'
                  : player.track.artists.map(artist => artist.label).join(', ')}
              </span>
            </div>
          </div>
          <div className={classes.mainControls}>
            <IconButton
              disabled={
                player.playList.findIndex(
                  item => item._id === player.track._id,
                ) < 1
              }
              onClick={onPrevious}
              aria-label='previous'
            >
              <SkipPreviousIcon className={classes.icon} />
            </IconButton>

            {player.play ? (
              <IconButton onClick={onPause} aria-label='play'>
                <PauseCircleOutlineIcon
                  className={classes.icon}
                  fontSize='large'
                />
              </IconButton>
            ) : (
              <IconButton onClick={onPlay} aria-label='play'>
                <PlayCircleOutlineIcon
                  className={classes.icon}
                  fontSize='large'
                />
              </IconButton>
            )}

            <IconButton
              disabled={
                player.playList.length ===
                  player.playList.findIndex(
                    item => item._id === player.track._id,
                  ) +
                    1 && !player.repeat
              }
              onClick={onNext}
              aria-label='next'
            >
              <SkipNextIcon className={classes.icon} />
            </IconButton>
          </div>
          <div className={classes.subControls}>
            <IconButton
              disabled={player.playList.length === 0}
              onClick={onRepeat}
              aria-label='repeat'
              color={player.repeat ? 'secondary' : 'default'}
            >
              <RepeatIcon className={classes.icon} fontSize='small' />
            </IconButton>

            <IconButton
              disabled={player.playList.length === 0}
              onClick={onShaffle}
              aria-label='shuffle'
            >
              <ShuffleIcon className={classes.icon} fontSize='small' />
            </IconButton>

            <div className={classes.volume}>
              <IconButton onClick={onVolDown} aria-label='play'>
                {volume === 0 ? (
                  <VolumeOffIcon className={classes.icon} fontSize='small' />
                ) : (
                  <VolumeDownIcon className={classes.icon} fontSize='small' />
                )}
              </IconButton>
              <div
                id='volumeBar'
                className={classes.volbar}
                onMouseDown={e => handleVolDrag(e)}
              >
                <LinearProgress
                  color='secondary'
                  variant='determinate'
                  value={volume}
                />
              </div>

              <IconButton onClick={onVolUp} aria-label='play'>
                <VolumeUpIcon className={classes.icon} fontSize='small' />
              </IconButton>
            </div>
          </div>
        </div>
        <div
          id='progressBar'
          className={classes.progressBar}
          onMouseDown={e => handleTimeDrag(e)}
        >
          <LinearProgress
            color='secondary'
            variant={player.loading ? 'indeterminate' : 'determinate'}
            value={progress}
          />
          <div className={classes.time}>
            <span>{formatTime(curTime)}</span>
            <span>{formatTime(player.duration)}</span>
          </div>
        </div>
      </Card>
    </>
  );
};

AudioPlayer.propTypes = {
  setLoading: PropTypes.func.isRequired,
  setPlay: PropTypes.func.isRequired,
  setPause: PropTypes.func.isRequired,
  setRepeat: PropTypes.func.isRequired,
  setNextTrack: PropTypes.func.isRequired,
  setPreviousTrack: PropTypes.func.isRequired,
  setDuration: PropTypes.func.isRequired,
  shufflePlaylist: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  player: state.player,
});

export default connect(mapStateToProps, {
  setLoading,
  setPlay,
  setPause,
  setRepeat,
  setNextTrack,
  setPreviousTrack,
  setDuration,
  shufflePlaylist,
})(AudioPlayer);
