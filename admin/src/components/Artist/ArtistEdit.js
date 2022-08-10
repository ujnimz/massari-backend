import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getGenres, clearGenres} from '../../actions/genreActions';
import {addArtist, updateArtist} from '../../actions/artistActions';

import {makeStyles} from '@material-ui/core/styles';
import {Fab} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
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
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    marginTop: 15,
  },
  genreChip: {
    margin: theme.spacing(0.5),
  },
}));

const initialFormValues = {
  name: '',
  image: '',
  genres: [
    {
      value: '5fc7663bd0b6bb138fe8a6a4',
      label: 'Hiphop',
    },
  ],
  published: true,
};

const ArtistEdit = props => {
  const classes = useStyles();
  const {
    artist,
    genres,
    artists,
    getGenres,
    clearGenres,
    addArtist,
    updateArtist,
  } = props;

  const [values, setValues] = useState(initialFormValues);

  useEffect(() => {
    getGenres();
    if (artist._id) {
      setValues(artist);
    } else {
      setValues(initialFormValues);
    }
    return () => {
      clearGenres();
      setValues({});
    };
  }, [getGenres, clearGenres, artist]);

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

  const handlePublished = () => {
    setValues({
      ...values,
      published: !values.published,
    });
  };

  // Submit form
  const onSubmitForm = e => {
    e.preventDefault();
    if (artist._id) {
      updateArtist(artist._id, values);
    } else {
      addArtist(values);
    }
  };

  let genresListRender = <span>Working...</span>;
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
        {artist._id ? 'Edit' : 'Add'} Artist
      </Typography>

      <Paper className={classes.formWrapper}>
        {artists.saving ? <LinearProgress color='secondary' /> : null}
        <form
          onSubmit={onSubmitForm}
          className={classes.root}
          noValidate
          autoComplete='off'
        >
          <FormControl className={classes.formRow}>
            <TextField
              name='name'
              value={values.name}
              onChange={handleTextInput}
              required
              color='secondary'
              label='Artist Name'
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
              label='Artist Image URL'
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

ArtistEdit.propTypes = {
  getGenres: PropTypes.func.isRequired,
  clearGenres: PropTypes.func.isRequired,
  addArtist: PropTypes.func.isRequired,
  updateArtist: PropTypes.func.isRequired,
  genres: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired,
  artist: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  genres: state.genres,
  artists: state.artists,
});

export default connect(mapStateToProps, {
  getGenres,
  clearGenres,
  addArtist,
  updateArtist,
})(ArtistEdit);
