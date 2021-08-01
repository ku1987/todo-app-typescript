import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { authenticate } from 'api/login';
import { APP_TITLE, ERROR_CODES, ERROR_MESSAGES, TOKEN_TYPES } from 'biz/const';
import { redirectToApp } from 'utils/login-utils';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  snackbar: {
    maxWidth: 600,
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login() {
  useEffect(() => {
    document.title = `Login | ${APP_TITLE}`;
  }, []);

  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setErrorMessage('');
      try {
        const result = await authenticate(email, password);
        localStorage.setItem(TOKEN_TYPES.ACCESS_TOKEN, result);
        redirectToApp();
      } catch (error) {
        console.error(error);
        if (error.response.status === ERROR_CODES.UNAUTHORIZED || error.response.status === ERROR_CODES.NOT_FOUND) {
          setErrorMessage(ERROR_MESSAGES.LOGIN_FAILED);
        }
      }
    },
    [email, password]
  );

  return (
    <div className="App">
      <Container maxWidth="sm">
        <div className={classes.paper}>
          {errorMessage ?? (
            <div className={classes.snackbar}>
              <SnackbarContent message={errorMessage} variant="outlined" />
            </div>
          )}
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              disabled={!email || !password}
              type="submit"
              fullWidth
              variant="contained"
              color="default"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Login;
