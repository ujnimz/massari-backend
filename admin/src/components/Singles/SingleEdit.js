import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getGenres, clearGenres} from '../../actions/genreActions';
import {getArtists, clearArtists} from '../../actions/artistActions';
import {addSingle, updateSingle} from '../../actions/singleActions';

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
import Chip from '@material-ui/core/Chip';
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
  singleImageName: '',
  artists: [],
  genres: [
    {
      value: '5fc7663bd0b6bb138fe8a6a4',
      label: 'Hiphop',
    },
  ],
  uri: '',
  lyrics: '',
  credits: '',
  published: true,
};

const SingleEdit = props => {
  const classes = useStyles();
  const {
    single,
    singles,
    genres,
    artists,
    getGenres,
    clearGenres,
    getArtists,
    clearArtists,
    addSingle,
    updateSingle,
  } = props;

  const {artistsList, loading} = artists;
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = useState(initialFormValues);

  useEffect(() => {
    getGenres();
    getArtists();
    if (single._id) {
      setValues({
        title: single.title,
        image: single.image,
        artists: single.artists,
        genres: single.genres,
        uri: single.uri,
        lyrics: single.lyrics,
        credits: single.credits,
        published: single.published,
      });
    } else {
      setValues(initialFormValues);
    }
    return () => {
      clearGenres();
      clearArtists();
      setValues({});
    };
  }, [getGenres, clearGenres, getArtists, clearArtists, single]);

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

  const handleGenreDelete = genreId => {
    const newGenres = [...values.genres];
    setValues({
      ...values,
      genres: newGenres.filter(item => item.value !== genreId),
    });
  };

  const handleGenreAdd = genre => {
    const newGenres = [
      ...values.genres,
      {value: genre._id, label: genre.title},
    ];
    setValues({
      ...values,
      genres: newGenres,
    });
  };

  const onArtistsChange = artists => {
    setValues({
      ...values,
      artists: artists,
    });
  };

  const handlePublished = () => {
    setValues({
      ...values,
      published: !values.published,
    });
  };

  // Submit form
  const onSubmitForm = e => {
    e.preventDefault();
    if (single._id) {
      updateSingle(single._id, values);
    } else {
      addSingle(values);
    }
  };

  let genresListRender = <CircularProgress color='inherit' size={18} />;
  if (!genres.loading) {
    genresListRender = genres.genresList
      .filter(genre => genre.published === true)
      .map(genre => (
        <li key={genre._id}>
          <Chip
            color={
              values.genres.some(data => data.value === genre._id)
                ? 'secondary'
                : 'default'
            }
            onClick={
              values.genres.some(data => data.value === genre._id)
                ? () => handleGenreDelete(genre._id)
                : () => handleGenreAdd(genre)
            }
            label={genre.title}
            className={classes.genreChip}
          />
        </li>
      ));
  }

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
        {single._id ? 'Edit' : 'Add'} Single
      </Typography>

      <Paper className={classes.formWrapper}>
        {singles.saving ? <LinearProgress color='secondary' /> : null}
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
              label='Single Title'
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
              label='Single Cover URL'
            />
          </FormControl>

          <FormControl className={classes.formRow}>
            <Autocomplete
              multiple
              id='asynchronous-demo'
              open={open}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              getOptionSelected={(option, value) =>
                option.value === value.value
              }
              getOptionLabel={option => option.label}
              options={artistsList.map(artist => ({
                value: artist._id,
                label: artist.name,
              }))}
              value={values.artists}
              loading={loading}
              onChange={(event, value) => onArtistsChange(value)}
              renderInput={params => (
                <TextField
                  {...params}
                  required
                  label='Artists'
                  variant='standard'
                  color='secondary'
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
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
            <FormLabel component='legend'>Genres</FormLabel>
            <Paper
              variant='outlined'
              square
              color='primary'
              elevation={0}
              component='ul'
              className={classes.formPaper}
            >
              {genresListRender}
            </Paper>
          </FormControl>

          <FormControl className={classes.formRow}>
            <TextField
              name='uri'
              value={values.uri}
              onChange={handleTextInput}
              required
              color='secondary'
              label='Single File'
            />
          </FormControl>

          <FormControl className={classes.formRow}>
            <TextField
              multiline
              rows={5}
              name='lyrics'
              value={values.lyrics}
              onChange={handleTextInput}
              color='secondary'
              label='Lyrics'
            />
          </FormControl>

          <FormControl className={classes.formRow}>
            <TextField
              multiline
              rows={5}
              name='credits'
              value={values.credits}
              onChange={handleTextInput}
              color='secondary'
              label='Credits'
            />
          </FormControl>

          <FormControl className={classes.formRow}>
            <FormLabel component='label' focused={false}>
              Status
            </FormLabel>
            <Paper elevation={0} className={classes.formPaper}>
              <Switch
                checked={values.published}
                onChange={handlePublished}
                name='published'
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

SingleEdit.propTypes = {
  getGenres: PropTypes.func.isRequired,
  clearGenres: PropTypes.func.isRequired,
  getArtists: PropTypes.func.isRequired,
  clearArtists: PropTypes.func.isRequired,
  addSingle: PropTypes.func.isRequired,
  updateSingle: PropTypes.func.isRequired,
  single: PropTypes.object.isRequired,
  singles: PropTypes.object.isRequired,
  genres: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  genres: state.genres,
  artists: state.artists,
  singles: state.singles,
});

export default connect(mapStateToProps, {
  getGenres,
  clearGenres,
  getArtists,
  clearArtists,
  addSingle,
  updateSingle,
})(SingleEdit);
