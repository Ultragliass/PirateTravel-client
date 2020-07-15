import { useAddPageStyles } from "./styles";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Paper,
  Typography,
  Grid,
  TextField,
  IconButton,
} from "@material-ui/core";
import { Clear, Check } from "@material-ui/icons";

interface AddPageProps {
  addVacation(vacation: {
    description: string;
    destination: string;
    startDate: string;
    endDate: string;
    price: number | string;
    image: string;
    followers: 0;
    isFollowing: 0;
  }): Promise<boolean>;
}

export function _AddPage(props: AddPageProps) {
  const { addVacation } = props;

  const classes = useAddPageStyles();

  const history = useHistory();

  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("0");
  const [endDate, setEndDate] = useState("1");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const isDisabled =
    !description || !destination || !startDate || !endDate || !price || !image;

  const formatDate = (date: any) =>
    new Date(new Date(date).toString().split("GMT")[0] + " UTC")
      .toISOString()
      .split(".")[0];

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case "description": {
        return setDescription(value);
      }

      case "destination": {
        return setDestination(value);
      }

      case "startDate": {
        return setStartDate(value as any);
      }

      case "endDate": {
        return setEndDate(value as any);
      }

      case "price": {
        return setPrice(value);
      }

      case "image": {
        return setImage(value);
      }
    }
  };

  const handleAddVacation = async (event: FormEvent) => {
    event.preventDefault();

    const success = await addVacation({
      description,
      destination,
      startDate,
      endDate,
      price,
      image,
      followers: 0,
      isFollowing: 0,
    });

    if (!success) {
      return;
    }

    history.goBack();
  };

  return (
    <form className={classes.layout} onSubmit={handleAddVacation}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Add vacation.
        </Typography>

        <Grid container spacing={10}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="destination"
              label="Destination"
              inputProps={{ maxLength: 30 }}
              fullWidth
              required
              onChange={handleInputChange}
              value={destination}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="price"
              label="Price (USD)"
              type="number"
              inputProps={{ min: 0, step: ".01" }}
              fullWidth
              required
              onChange={handleInputChange}
              value={price}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Description"
              fullWidth
              required
              onChange={handleInputChange}
              inputProps={{ minLength: 30, maxLength: 200 }}
              multiline
              value={description}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="startDate"
              label="Start"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
              onChange={handleInputChange}
              value={formatDate(startDate)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="endDate"
              label="End"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
              onChange={handleInputChange}
              value={formatDate(endDate)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="image"
              label="Image URL"
              inputProps={{ maxLength: 100 }}
              fullWidth
              required
              onChange={handleInputChange}
              value={image}
            />
          </Grid>
        </Grid>

        <div className={classes.buttons}>
          <Link to="/vacations">
            <IconButton className={classes.button}>
              <Clear />
            </IconButton>
          </Link>

          <IconButton
            className={classes.button}
            disabled={isDisabled}
            type="submit"
          >
            <Check />
          </IconButton>
        </div>
      </Paper>
    </form>
  );
}