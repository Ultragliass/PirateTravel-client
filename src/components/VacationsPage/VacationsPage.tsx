import React from "react";
import { IVacation } from "../../models/vacation";
import { useVacationPageStyles } from "./styles";
import { Container, Typography, Grid } from "@material-ui/core";
import { IUser } from "../../models/user";
import { Vacation } from "../Vacation";

interface VacationsPageProps {
  getVacations(): void;
  vacations: IVacation[];
  userData: null | IUser;
}

export function _VacationsPage(props: VacationsPageProps) {
  const { getVacations, vacations, userData } = props;

  const classes = useVacationPageStyles();

  if (!vacations.length) {
    getVacations();
  }

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

      <Container className={classes.grid} maxWidth="lg">
        <Grid container spacing={7}>
          {vacations.map((vacation) => (
            <Vacation key={vacation.id} {...vacation} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
