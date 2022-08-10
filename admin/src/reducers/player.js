import {
  SET_LOADING,
  SET_PLAY,
  SET_PAUSE,
  SET_REPEAT,
  SET_SHUFFLE,
  SET_DURATION,
  ADD_TRACK,
  REMOVE_TRACK,
  SET_CURRENT_TRACK,
  SET_NEXT_TRACK,
  SET_PREVIOUS_TRACK,
  SHUFFLE,
} from '../actions/types';

const initialState = {
  loading: false,
  play: false,
  repeat: false,
  shuffle: false,
  volume: 50,
  duration: 0,
  curTime: 0,
  track: {},
  playList: [],
  backupPlayList: [],
};

function shufflePlaylist(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

const player = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_PLAY:
      return {
        ...state,
        play: true,
      };
    case SET_PAUSE:
      return {
        ...state,
        play: false,
      };
    case SET_REPEAT:
      return {
        ...state,
        repeat: !state.repeat,
      };
    case SET_SHUFFLE:
      return {
        ...state,
        shuffle: !state.shuffle,
      };
    case SHUFFLE:
      return {
        ...state,
        playList: payload
          ? state.backupPlayList
          : shufflePlaylist(state.playList),
      };
    case SET_DURATION:
      return {
        ...state,
        duration: payload,
        loading: false,
      };
    case ADD_TRACK:
      return {
        ...state,
        playList: [...state.playList, payload],
        backupPlayList: [...state.backupPlayList, payload],
      };
    case SET_CURRENT_TRACK:
      return {
        ...state,
        track:
          state.playList[
            state.playList.findIndex(item => item._id === payload)
          ],
        play: true,
      };
    case SET_NEXT_TRACK:
      return {
        ...state,
        track:
          state.playList[
            state.playList.findIndex(item => item._id === payload) + 1 in
            state.playList
              ? state.playList.findIndex(item => item._id === payload) + 1
              : 0
          ],
        play:
          state.playList.findIndex(item => item._id === payload) + 1 in
          state.playList
            ? true
            : state.repeat
            ? true
            : false,
      };
    case SET_PREVIOUS_TRACK:
      return {
        ...state,
        track:
          state.playList[
            state.playList.findIndex(item => item._id === payload) - 1
          ],
      };
    case REMOVE_TRACK:
      return {
        ...state,
        playList: state.playList.filter(item => item._id !== payload),
        backupPlayList: state.backupPlayList.filter(
          item => item._id !== payload,
        ),
      };
    default:
      return state;
  }
};

export default player;
