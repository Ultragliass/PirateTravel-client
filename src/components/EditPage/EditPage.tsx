import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Typography,
  Grid,
  TextField,
  Paper,
  IconButton,
} from "@material-ui/core";
import { useEditPageStyles } from "./styles";
import { Link, useParams, Redirect } from "react-router-dom";
import { Check, Clear } from "@material-ui/icons";
import { IVacation } from "../../models/vacation";

interface EditPageProps {
  vacations: IVacation[];
  editVacation(vacation: any, id: number): void;
}

export function _EditPage(props: EditPageProps) {
  const { vacations, editVacation } = props;

  const { id } = useParams();

  const classes = useEditPageStyles();

  const index = vacations.findIndex((vacation) => vacation.id === Number(id));

  const {
    description,
    destination,
    startDate,
    endDate,
    price,
    image,
    followers,
  } = vacations[index];

  const [newDescription, setNewDescription] = useState(description);
  const [newDestination, setNewDestination] = useState(destination);
  const [newStartDate, setNewStartDate] = useState(startDate);
  const [newEndDate, setNewEndDate] = useState(endDate);
  const [newPrice, setNewPrice] = useState(price);
  const [newImage, setNewImage] = useState(image);

  const isDisabled =
    description === newDescription &&
    destination === newDestination &&
    startDate === newStartDate &&
    endDate === newEndDate &&
    price === newPrice &&
    image === newImage;

  const formatDate = (date: any) =>
    new Date(new Date(date).toString().split("GMT")[0] + " UTC")
      .toISOString()
      .split(".")[0];

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case "description": {
        return setNewDescription(value);
      }

      case "destination": {
        return setNewDestination(value);
      }

      case "startDate": {
        return setNewStartDate(value as any);
      }

      case "endDate": {
        return setNewEndDate(value as any);
      }

      case "price": {
        return setNewPrice(value);
      }

      case "image": {
        return setNewImage(value);
      }
    }
  };

  const handleEditVacation = (event: FormEvent) => {
    event.preventDefault();

    editVacation(
      {
        description: newDescription,
        destination: newDestination,
        startDate: newStartDate,
        endDate: newEndDate,
        price: newPrice,
        image: newImage,
        followers,
      },
      Number(id)
    );

    
    return <Redirect to="/vacations" />;
  };

  return (
    <form className={classes.layout} onSubmit={handleEditVacation}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Edit vacation.
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
              value={newDestination}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="price"
              label="Price (USD)"
              type="number"
              inputProps={{ min: 0 }}
              fullWidth
              required
              onChange={handleInputChange}
              value={newPrice}
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
              value={newDescription}
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
              value={formatDate(newStartDate)}
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
              value={formatDate(newEndDate)}
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
              value={newImage}
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
