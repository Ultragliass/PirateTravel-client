import React, { useState, ChangeEvent, FormEvent } from "react";
import { useLoginPageStyles } from "./styles";
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

export default function _LoginPage(props: LoginPageProps) {
  const { loginUser } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.currentTarget;

    if (name === "username") {
      setUsername(value);

      return;
    }

    setPassword(value);
  };

  const handleUserLogin = (event: FormEvent) => {
    event.preventDefault();

    loginUser(username, password);
  };

  const classes = useLoginPageStyles();
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.flex}>
        <Avatar className={classes.icon}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleUserLogin}>
          <TextField
            variant="filled"
            margin="normal"
            fullWidth
            label="Username"
            name="username"
            autoFocus
            className={classes.input}
            onChange={handleInputChange}
          />
          <TextField
            variant="filled"
            margin="normal"
            fullWidth
            label="Password"
            name="password"
            type="password"
            className={classes.input}
            onChange={handleInputChange}
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
