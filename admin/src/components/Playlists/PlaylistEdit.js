import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getSingles, clearSingles} from '../../actions/singleActions';
import {addPlaylist, updatePlaylist} from '../../actions/playlistActions';

import {makeStyles} from '@material-ui/core/styles';
import {Fab} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Switch from '@material-ui/core/Switch';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(2),
      width: '100%',
    },
  },
  formWrapper: {
    padding: 15,
  },
  formRow: {
    marginBottom: 30,
    display: 'block',
  },
  imageUpload: {
    position: 'relative',
    paddingTop: 20,
    paddingBottom: 15,
  },
  fileInput: {
    position: 'absolute',
    zIndex: 1,
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    zIndex: 0,
  },
  formPaper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    height: 50,
    padding: theme.spacing(0.5),
    marginTop: 15,
  },
  genreChip: {
    margin: theme.spacing(0.5),
  },
}));

const initialFormValues = {
  title: '',
  image: '',
  songs: [],
  users: [
    {
      username: 'admin',
      userId: '1',
    },
  ],
  public: false,
};

const PlaylistEdit = props => {
  const classes = useStyles();
  const {
    playlist,
    playlists,
    singles,
    getSingles,
    clearSingles,
    addPlaylist,
    updatePlaylist,
  } = props;

  const {singlesList, loading: singlesLoading} = singles;
  const [songsOpen, setSongsOpen] = useState(false);
  const [values, setValues] = useState(initialFormValues);

  useEffect(() => {
    getSingles();
    if (playlist._id) {
      setValues({
        title: playlist.title,
        image: playlist.image,
        songs: playlist.songs,
        users: playlist.users,
        public: playlist.public,
      });
    } else {
      setValues(initialFormValues);
    }
    return () => {
      clearSingles();
      setValues({});
    };
  }, [getSingles, clearSingles, playlist]);

  const handleTextInput = e => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleImageUpload = e => {
    var imageUrl = URL.createObjectURL(e.target.files[0]);
    //setArtistImage(imageUrl);
    //setImageName(e.target.files[0].name);
    setValues({
      ...values,
      image: imageUrl,
    });
  };

  const onSongsChange = songs => {
    setValues({
      ...values,
      songs: songs,
    });
  };

  const handlePublic = () => {
    setValues({
      ...values,
      public: !values.public,
    });
  };

  // Submit form
  const onSubmitForm = e => {
    e.preventDefault();
    if (playlist._id) {
      updatePlaylist(playlist._id, values);
    } else {
      addPlaylist(values);
    }
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
        {playlist._id ? 'Edit' : 'Add'} Playlist
      </Typography>

      <Paper className={classes.formWrapper}>
        {playlists.saving ? <LinearProgress color='secondary' /> : null}
        <form
          onSubmit={onSubmitForm}
          className={classes.root}
          noValidate
          autoComplete='off'
        >
          <FormControl className={classes.formRow}>
            <TextField
              name='title'
              value={values.title}
              onChange={handleTextInput}
              required
              color='secondary'
              label='Playlist Title'
            />
          </FormControl>

          <FormControl className={classes.formRow}>
            <FormLabel component='legend'>Upload Avatar</FormLabel>
            <div className={classes.imageUpload}>
              <InputLabel htmlFor='upload-photo' className={classes.fileInput}>
                <input
                  style={{display: 'none'}}
                  id='upload-photo'
                  name='upload-photo'
                  type='file'
                  accept='.png, .jpg, .jpeg'
                  onChange={handleImageUpload}
                />
                <Fab
                  color='secondary'
                  size='small'
                  component='span'
                  aria-label='add'
                  variant='round'
                >
                  <AddPhotoAlternateIcon />
                </Fab>
              </InputLabel>
              <Avatar className={classes.avatar} src={values.image} />
            </div>
            <TextField
              name='image'
              value={values.image}
              onChange={handleTextInput}
              required
              color='secondary'
              label='Playlist Cover URL'
            />
          </FormControl>

          <FormControl className={classes.formRow}>
            <Autocomplete
              multiple
              id='asynchronous-demo'
              open={songsOpen}
              onOpen={() => {
                setSongsOpen(true);
              }}
              onClose={() => {
                setSongsOpen(false);
              }}
              getOptionSelected={(option, value) =>
                option.value === value.value
              }
              getOptionLabel={option => option.label}
              options={singlesList.map(single => ({
                value: single._id,
                label: single.title,
              }))}
              value={values.songs}
              loading={singlesLoading}
              onChange={(event, value) => onSongsChange(value)}
              renderInput={params => (
                <TextField
                  {...params}
                  required
                  label='Songs'
                  variant='standard'
                  color='secondary'
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {singlesLoading ? (
                          <CircularProgress color='inherit' size={18} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
          </FormControl>

          <FormControl className={classes.formRow}>
            <FormLabel component='label' focused={false}>
              Status
            </FormLabel>
            <Paper elevation={0} className={classes.formPaper}>
              <Switch
                checked={values.public}
                onChange={handlePublic}
                name='public'
              />
            </Paper>
          </FormControl>

          <FormControl>
            <Button
              variant='contained'
              color='secondary'
              size='large'
              startIcon={<SaveIcon />}
              type='submit'
            >
              Save
            </Button>
          </FormControl>
        </form>
      </Paper>
    </>
  );
};

PlaylistEdit.propTypes = {
  getSingles: PropTypes.func.isRequired,
  clearSingles: PropTypes.func.isRequired,
  addPlaylist: PropTypes.func.isRequired,
  updatePlaylist: PropTypes.func.isRequired,
  playlists: PropTypes.object.isRequired,
  playlist: PropTypes.object.isRequired,
  singles: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  playlists: state.playlists,
  singles: state.singles,
});

export default connect(mapStateToProps, {
  getSingles,
  clearSingles,
  addPlaylist,
  updatePlaylist,
})(PlaylistEdit);
