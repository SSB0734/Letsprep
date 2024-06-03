import * as React from "react";
import firebase from "firebase";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../../Styles/Signup.css";
import { auth } from "../../firebaseApp";
import { useHistory, NavLink } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import api from "../../constants";
import firebaseApp from "../../firebaseApp";

var passwordValidator = require("password-validator");

var schema = new passwordValidator();

schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(30) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(1) // Must have at least 1 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {"Copyright © "}
      <Link color='inherit' href='https://material-ui.com/'>
        LetsPrep!
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [passwordstate, setPasswordstate] = useState(false);
  const [{ user }, dispatch] = useStateValue();
  const [loginState, setloginState] = useState(false);
  const history = useHistory();

  //sigin with google
  var usergoogle;
  const googleSignIn = () => {
    var base_provider = new firebase.auth.GoogleAuthProvider();
    firebaseApp
      .auth()
      .signInWithPopup(base_provider)
      .then(function (result) {
        usergoogle = result.user;
        // //console.log(result.additionalUserInfo.profile.name);
        // //console.log("Success login with google");
        // history.push("/");
        fetch(`${api}user/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: result.additionalUserInfo.profile.given_name,
            lastName: result.additionalUserInfo.profile.family_name,
            email: result.additionalUserInfo.profile.email,
            // contact: data.get("contact"),
            // password: data.get("passowrd"),
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            // do what you want with the response here
            // //console.log(responseJson);
          })
          .catch((error) => {
            // console.error(error);
          });
        history.push("/");
      })
      .catch(function (err) {
        // //console.log(err);
        // //console.log("Failed login");
      });
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    // //console.log({
    //   firstNamme: data.get("firstName"),
    //   lastName: data.get("lastName"),
    //   email: data.get("email"),
    //   contact: data.get("contact"),
    //   password: data.get("password"),
    // });

    if (schema.validate(data.get("password"))) {
      auth
        .createUserWithEmailAndPassword(data.get("email"), data.get("password"))
        .then((auth) => {
          // //console.log(auth);
          if (auth) {
            auth.user.sendEmailVerification().then(() => {
              fetch(`${api}user/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  firstName: data.get("firstName"),
                  lastName: data.get("lastName"),
                  email: data.get("email"),
                  contact: data.get("contact"),
                  college: data.get("college"),
                  password: data.get("passowrd"),
                }),
              })
                .then((response) => response.json())
            })
            history.push("/");
          }
        })
        .catch((error) => alert("something went wrong please sign up again!"));
    } else {
      alert("please follow password rules!");
    }
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    // //console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    auth
      .signInWithEmailAndPassword(data.get("email"), data.get("password"))
      .then((auth) => {
        // //console.log("signin");
        // if (auth) {
        //   // fetch("https://letsprep-backend.herokuapp.com/signin", {
        //   fetch(`${api}signin`, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: {
        //       email: data.get("email"),
        //       password: data.get("passowrd"),
        //     },
        //   })
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //       // do what you want with the response here
        //       // //console.log(responseJson);
        //     })
        //     .catch((error) => {
        //       // console.error(error);
        //     });
        // }
        history.push("/");
      })
      .catch((error) => alert("Wrong email address or password"));
  };

  return loginState ? (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box
            component='form'
            onSubmit={handleSignIn}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />
            {/* <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            /> */}
            <TextField
              required
              fullWidth
              name='password'
              label='Password'
              type={passwordstate ? "password" : "text"}
              id='password'
              autoComplete='new-password'
              type={passwordstate ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => {
                        if (passwordstate) {
                          setPasswordstate(false);
                        } else {
                          setPasswordstate(true);
                        }
                      }}
                    // onMouseDown={handleMouseDownPassword}
                    >
                      {passwordstate && <VisibilityIcon />}
                      {!passwordstate && <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 0 }}
            >
              Sign In
            </Button>
            <Button
              // type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 1 }}
              onClick={googleSignIn}
            >
              Sign In With Google
            </Button>
            <Grid container>
              <Grid item xs>
                <NavLink to='/fp' variant='body2'>
                  Forgot password?
                </NavLink>
              </Grid>
              <Grid item>
                <Link
                  onClick={() => {
                    setloginState(false);
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSignUp}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='fname'
                  name='firstName'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name='lastName'
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='lname'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='contact'
                  label='Contact Number'
                  name='contact'
                  autoComplete='contact'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='college'
                  label='College'
                  name='college'
                  autoComplete='college'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type={passwordstate ? "password" : "text"}
                  id='password'
                  autoComplete='new-password'
                  type={passwordstate ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={() => {
                            if (passwordstate) {
                              setPasswordstate(false);
                            } else {
                              setPasswordstate(true);
                            }
                          }}
                        // onMouseDown={handleMouseDownPassword}
                        >
                          {passwordstate && <VisibilityIcon />}
                          {!passwordstate && <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {/* {passwordstate == "password" ? (
                  <div
                    onClick={() => {
                      setPasswordstate("text");
                    }}
                  >
                    <VisibilityOffIcon />
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setPasswordstate("password");
                    }}
                  >
                    <VisibilityIcon />
                  </div>
                )} */}
              </Grid>
              <Grid item xs={12}>
                {/* <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                /> */}
                <div>
                  Password should contain atleast 8 characters (it must include
                  atleast one uppercase, one lowercase, one digit and no spaces)
                </div>
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 0 }}
            >
              Sign Up
            </Button>
            <Button
              // type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 1 }}
              onClick={googleSignIn}
            >
              Sign In With Google
            </Button>

            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link
                  onClick={() => {
                    setloginState(true);
                  }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
