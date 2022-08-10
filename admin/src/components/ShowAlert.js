import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Grid} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const ShowAlert = ({alerts}) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <Grid key={alert.id} item xs={12}>
      <Alert severity={alert.alertType}>{alert.message}</Alert>
    </Grid>
  ));

ShowAlert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(ShowAlert);
