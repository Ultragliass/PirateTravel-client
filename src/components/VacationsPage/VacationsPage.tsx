import React, { useEffect } from "react";
import { IVacation } from "../../models/vacation";
import { useVacationPageStyles } from "./styles";
import {
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { IUser } from "../../models/user";

interface VacationsPageProps {
  connectSocketIo(): void;
  getVacations(): void;
  vacations: IVacation[];
  socket: null | SocketIOClientStatic;
  userData: null | IUser;
}

export function _VacationsPage(props: VacationsPageProps) {
  const { connectSocketIo, getVacations, vacations, socket, userData } = props;

  const classes = useVacationPageStyles();

  useEffect(() => {
    if (!vacations.length) {
      getVacations();
    }

    if (!socket) {
      connectSocketIo();
    }
  }, []);

  return (
    <>
      <div className={classes.content}>
        <Container maxWidth="md">
          <Typography align="center" gutterBottom>
            <img src="/images/logo.png" alt="logo-large" />
          </Typography>
          <Typography
            variant="h5"
            align="center"
            paragraph
            className={classes.text}
          >
            Welcome to Pirate Travel, {userData?.name}! Check out some of our
            best vacations down below, we'll take you on a magical journey on
            one of our many oldschool pirate ships, for glory, booze, and booty!
            But mostly fun.
          </Typography>
        </Container>
      </div>
    </>
  );
}
