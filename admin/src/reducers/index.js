import {combineReducers} from 'redux';
import alert from './alert';
import settings from './settings';
import artists from './artists';
import genres from './genres';
import singles from './singles';
import albums from './albums';
import playlists from './playlists';
import player from './player';
import auth from './auth';

export default combineReducers({
  alert,
  settings,
  artists,
  genres,
  singles,
  albums,
  playlists,
  player,
  auth,
});
