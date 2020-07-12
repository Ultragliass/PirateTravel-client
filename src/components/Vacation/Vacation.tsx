import { IVacation } from "../../models/vacation";
import React, { useState } from "react";
import {
  Grid,
  CardMedia,
  CardContent,
  Card,
  Typography,
  CardActions,
  IconButton,
  Grow,
} from "@material-ui/core";
import { useVacationStyles } from "./styles";
import { Favorite, FavoriteBorder } from "@material-ui/icons";

interface VacationProps extends IVacation {
  toggleFollow(id: number, isFollowing: number): void;
  isAdmin: boolean;
}

export function _Vacation(props: VacationProps) {
  const {
    id,
    destination,
    image,
    description,
    isFollowing,
    startDate,
    endDate,
    toggleFollow,
    isAdmin,
  } = props;

  const classes = useVacationStyles();

  const [fade, setFade] = useState(true);

  const formatDate = (rawDate: any) => {
    const date = new Date(rawDate);

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const handleToggleFollow = () => {
    setFade(false);

    setTimeout(async () => {
      await toggleFollow(id, isFollowing);

      setFade(true);
    }, 500);
  };

  return (
    <Grow in={fade} timeout={300}>
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={image}
            title={destination}
          />
          <CardContent className={classes.cardContent}>
            <Typography
              gutterBottom
              align="center"
              variant="h4"
              className={classes.text}
            >
              {destination}
            </Typography>
            <Typography
              gutterBottom
              align="center"
              variant="h6"
              className={classes.text}
            >
              {`${formatDate(startDate)} - ${formatDate(endDate)}`}
            </Typography>
            <Typography className={classes.text}>{description}</Typography>
          </CardContent>
          <CardActions>
            {isAdmin ? null : (
              <IconButton onClick={handleToggleFollow}>
                {isFollowing ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            )}
          </CardActions>
        </Card>
      </Grid>
    </Grow>
  );
}
