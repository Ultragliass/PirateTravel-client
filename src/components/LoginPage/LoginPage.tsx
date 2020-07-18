import { useLoginPageStyles } from "./styles";
import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Container,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";

interface LoginPageProps {
  loginUser(username: string, password: string): void;
}

export function _LoginPage(props: LoginPageProps) {
  const { loginUser } = props;

  const classes = useLoginPageStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.currentTarget;

    if (name === "username") {
      return setUsername(value);
    }

    setPassword(value);
  };

  const handleUserLogin = (event: FormEvent): void => {
    event.preventDefault();

    loginUser(username, password);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.flex}>
        <Avatar className={classes.icon}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">Login</Typography>
        <form className={classes.form} onSubmit={handleUserLogin}>
          <TextField
            variant="filled"
            name="username"
            label="Username"
            margin="normal"
            autoFocus
            fullWidth
            className={classes.input}
            onChange={handleInputChange}
            value={username}
          />
          <TextField
            variant="filled"
            name="password"
            label="Password"
            margin="normal"
            type="password"
            fullWidth
            className={classes.input}
            onChange={handleInputChange}
            value={password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
}
