import React, {useState} from 'react';

// MUI
import {makeStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';

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
}));

const initialFormValues = {
  name: '',
  username: '',
  password: '',
};

const SignUp = () => {
  const classes = useStyles();

  const [values, setValues] = useState(initialFormValues);

  const handleTextInput = e => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: value,
    });
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
        SignUp
      </Typography>
      <form className={classes.root}>
        <FormControl className={classes.formRow}>
          <TextField
            name='name'
            onChange={handleTextInput}
            required
            color='secondary'
            label='Name'
          />
        </FormControl>
        <FormControl className={classes.formRow}>
          <TextField
            name='email'
            onChange={handleTextInput}
            required
            color='secondary'
            label='Email'
            type='email'
          />
        </FormControl>
        <FormControl className={classes.formRow}>
          <TextField
            name='password'
            onChange={handleTextInput}
            required
            color='secondary'
            label='Password'
            type='password'
          />
        </FormControl>

        <FormControl>
          <Button
            variant='contained'
            color='secondary'
            size='large'
            startIcon={<SaveIcon />}
            type='submit'
          >
            SignUp
          </Button>
        </FormControl>
      </form>
    </>
  );
};

export default SignUp;
