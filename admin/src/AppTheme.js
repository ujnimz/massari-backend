import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// Material UI
import {ThemeProvider} from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppRouter from './AppRouter';

//import { darkTheme, lightTheme } from './themeConfig';
import {createMuiTheme} from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import lightBlue from '@material-ui/core/colors/lightBlue';
import red from '@material-ui/core/colors/red';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

const AppTheme = props => {
  const classes = useStyles();
  const {dark} = props.settings;

  const themex = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: dark ? 'dark' : 'light',
          primary: {
            main: dark ? grey[800] : grey[50],
          },
          background: {
            paper: dark ? grey[800] : grey[50],
            default: dark ? grey[900] : grey[50],
          },
          secondary: {
            main: lightBlue.A700,
          },
          error: {
            main: red[500],
          },
        },
      }),
    [dark],
  );

  return (
    <ThemeProvider theme={themex}>
      <div className={classes.root}>
        <CssBaseline />
        <AppRouter />
      </div>
    </ThemeProvider>
  );
};

AppTheme.propTypes = {
  settings: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  settings: state.settings,
});

export default connect(mapStateToProps)(AppTheme);
