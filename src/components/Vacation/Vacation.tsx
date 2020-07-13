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
import { Favorite, FavoriteBorder, Clear, Edit } from "@material-ui/icons";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
import { Link } from "react-router-dom";

interface VacationProps extends IVacation {
  toggleFollow(id: number, isFollowing: number): void;
  deleteVacation(id: number): void;
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
    price,
    toggleFollow,
    deleteVacation,
    isAdmin,
  } = props;

  const classes = useVacationStyles();

  const [fade, setFade] = useState(true);

  const [open, setOpen] = useState(false);

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

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleDeleteVacation = () => {
    setOpen(false);
    deleteVacation(id);
  };

  return (
    <>
      <ConfirmModal
        open={open}
        handleClose={closeModal}
        handleConfirm={handleDeleteVacation}
        title="Delete vacation?"
      />

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
                For the humble price of: ${price}
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
              {isAdmin ? (
                <>
                  <IconButton onClick={openModal}>
                    <Clear />
                  </IconButton>
                  <Link to={`/edit/${id}`}>
                    <IconButton>
                      <Edit />
                    </IconButton>
                  </Link>
                </>
              ) : (
                <IconButton onClick={handleToggleFollow}>
                  {isFollowing ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
              )}
            </CardActions>
          </Card>
        </Grid>
      </Grow>
    </>
  );
}
