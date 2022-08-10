import React from 'react';
import {Link} from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';

import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import AlbumIcon from '@material-ui/icons/Album';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';

export const mainNavItems = (
  <>
    <ListItem style={{color: 'inherit'}} component={Link} to='/'>
      <ListItemIcon>
        <DashboardIcon color='secondary' />
      </ListItemIcon>
      <ListItemText color='textPrimary' primary='Dashboard' />
    </ListItem>
    <ListItem style={{color: 'inherit'}} component={Link} to='/artists'>
      <ListItemIcon>
        <SupervisorAccountIcon color='secondary' />
      </ListItemIcon>
      <ListItemText primary='Artists' />
    </ListItem>
    <ListItem style={{color: 'inherit'}} component={Link} to='/albums'>
      <ListItemIcon>
        <AlbumIcon color='secondary' />
      </ListItemIcon>
      <ListItemText primary='Albums' />
    </ListItem>
    <ListItem style={{color: 'inherit'}} component={Link} to='/singles'>
      <ListItemIcon>
        <RecordVoiceOverIcon color='secondary' />
      </ListItemIcon>
      <ListItemText primary='Singles' />
    </ListItem>
    <ListItem style={{color: 'inherit'}} component={Link} to='/genres'>
      <ListItemIcon>
        <LayersIcon color='secondary' />
      </ListItemIcon>
      <ListItemText primary='Genres' />
    </ListItem>
    <ListItem style={{color: 'inherit'}} component={Link} to='/playlists'>
      <ListItemIcon>
        <QueueMusicIcon color='secondary' />
      </ListItemIcon>
      <ListItemText primary='Playlists' />
    </ListItem>
  </>
);

export const secondaryNavItems = (
  <>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Link 1' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Link 2' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Link 3' />
    </ListItem>
  </>
);
