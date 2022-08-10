import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ChromePicker} from 'react-color';

import {addGenre, updateGenre} from '../../actions/genreActions';
// MUI
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
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
  colorPreview: {
    marginTop: 15,
    textAlign: 'center',
    width: 150,
    padding: 15,
    color: theme.palette.secondary.contrastText,
  },
  popover: {
    position: 'absolute',
    zIndex: '2',
  },
  cover: {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  },
}));

const initialFormValues = {
  title: '',
  color: '#000000',
  published: true,
};

const GenreEdit = props => {
  const classes = useStyles();
  const {genre, genres, addGenre, updateGenre} = props;

  const [values, setValues] = useState(initialFormValues);

  const [colorPickerOn, setColorPickerOn] = useState(false);

  useEffect(() => {
    if (genre._id) {
      setValues({
        title: genre.title,
        color: genre.color,
        published: genre.published,
      });
    } else {
      setValues(initialFormValues);
    }
    return () => {
      setValues({});
    };
  }, [genre]);

  const handleTextInput = e => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleColorClick = () => {
    setColorPickerOn(!colorPickerOn);
  };

  const handleColorClose = () => {
    setColorPickerOn(false);
  };

  const handleColorChange = color => {
    setValues({
      ...values,
      color: color.hex,
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
    //console.log(values);
    if (genre._id) {
      updateGenre(genre._id, values);
    } else {
      addGenre(values);
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
        {genre._id ? 'Edit' : 'Add'} Artist
      </Typography>

      <Paper className={classes.formWrapper}>
        {genres.saving ? <LinearProgress color='secondary' /> : null}
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
              label='Genre Title'
            />
          </FormControl>

          <FormControl className={classes.formRow}>
            <FormLabel component='label' focused={false}>
              Color
            </FormLabel>
            <Paper
              className={classes.colorPreview}
              style={{backgroundColor: values.color}}
              onClick={handleColorClick}
            >
              {values.color}
            </Paper>
            {colorPickerOn ? (
              <div className={classes.popover}>
                <div className={classes.cover} onClick={handleColorClose} />
                <ChromePicker
                  color={values.color}
                  onChange={handleColorChange}
                />
              </div>
            ) : null}
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

GenreEdit.propTypes = {
  genres: PropTypes.object.isRequired,
  genre: PropTypes.object.isRequired,
  addGenre: PropTypes.func.isRequired,
  updateGenre: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  genres: state.genres,
});

export default connect(mapStateToProps, {
  addGenre,
  updateGenre,
})(GenreEdit);
