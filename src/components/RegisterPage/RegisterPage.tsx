import { IRegister } from "../../models/register";
import { useRegisterPageStyles } from "./styles";
import React, { ChangeEvent, useState, FormEvent } from "react";
import {
  Container,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";

interface RegisterPageProps {
  registerUser(user: IRegister): void;
}

export function _RegisterPage(props: RegisterPageProps) {
  const { registerUser } = props;

  const classes = useRegisterPageStyles();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case "firstname": {
        return setFirstname(value);
      }

      case "lastname": {
        return setLastname(value);
      }

      case "username": {
        return setUsername(value);
      }

      case "password": {
        return setPassword(value);
      }
    }
  };

  const handleUserRegister = (event: FormEvent) => {
    event.preventDefault();

    registerUser({
      name: firstname,
      lastname,
      username,
      password,
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.flex}>
        <Avatar className={classes.icon}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} onSubmit={handleUserRegister}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstname"
                variant="filled"
                label="Name"
                className={classes.input}
                autoFocus
                fullWidth
                required
                onChange={handleInputChange}
                value={firstname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="filled"
                name="lastname"
                label="Lastname"
                className={classes.input}
                fullWidth
                required
                onChange={handleInputChange}
                value={lastname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="username"
                variant="filled"
                label="Username"
                className={classes.input}
                fullWidth
                required
                onChange={handleInputChange}
                value={username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                name="password"
                label="Password"
                type="password"
                className={classes.input}
                fullWidth
                required
                onChange={handleInputChange}
                value={password}
              />
            </Grid>

            <Grid item xs={12}>
              <p className={classes.highlight}>
                * Password should be at least 8 characters long, and include at
                least one number, and a lowercase and uppercase letter.
              </p>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
}
