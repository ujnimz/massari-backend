import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import AppHeader from './AppHeader';
import Home from './components/Home';
import Artists from './components/Artist/Artists';
import Singles from './components/Singles/Singles';
import Albums from './components/Albums/Albums';
import Genres from './components/Genres/Genres';
import Playlists from './components/Playlists/Playlists';
import ShowAlert from './components/ShowAlert';
import AudioPlayer from './components/Elements/AudioPlayer';

const useStyles = makeStyles(theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const AppRouter = () => {
  const classes = useStyles();

  return (
    <Router>
      <AppHeader />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          <Grid container spacing={3}>
            <ShowAlert />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/artists' component={Artists} />
              <Route path='/singles' component={Singles} />
              <Route path='/albums' component={Albums} />
              <Route path='/genres' component={Genres} />
              <Route path='/playlists' component={Playlists} />
            </Switch>
          </Grid>
          <Box pt={4}>
            <AudioPlayer />
          </Box>
        </Container>
      </main>
    </Router>
  );
};

export default AppRouter;
