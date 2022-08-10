import React from 'react';
import {FixedSizeList} from 'react-window';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {removeTrack} from '../../actions/playerActions';

import {makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles(theme => ({
  root: {
    width: 400,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function renderRow(props) {
  const {index, data} = props;

  return (
    <List dense>
      <ListItem button key={data.listData[index]._id}>
        <ListItemAvatar>
          <Avatar
            alt={data.listData[index].title}
            src={data.listData[index].image}
          />
        </ListItemAvatar>
        <ListItemText
          style={{fontSize: 11}}
          primary={data.listData[index].title}
          secondary={data.listData[index].artists
            .map(artist => artist.label)
            .join(', ')}
        />
        <ListItemSecondaryAction>
          <IconButton
            disabled={
              data.curTrackId === data.listData[index]._id ? true : false
            }
            onClick={() => data.removeTrack(data.listData[index]._id)}
            edge='end'
            aria-label='remove'
          >
            <HighlightOffIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

const PlayListTable = props => {
  const classes = useStyles();
  const {removeTrack, player} = props;
  return (
    <Accordion className={classes.root}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Typography className={classes.heading}>Current Playlist</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FixedSizeList
          height={300}
          width={400}
          itemSize={50}
          itemCount={player.playList.length}
          itemData={{
            listData: player.playList,
            curTrackId: player.track._id,
            removeTrack: removeTrack,
          }}
        >
          {renderRow}
        </FixedSizeList>
      </AccordionDetails>
    </Accordion>
  );
};

PlayListTable.propTypes = {
  removeTrack: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  player: state.player,
});

export default connect(mapStateToProps, {removeTrack})(PlayListTable);
