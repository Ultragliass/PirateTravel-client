import { useEditPageStyles } from "./styles";
import { IVacation } from "../../models/vacation";
import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Typography,
  Grid,
  TextField,
  Paper,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { Link, useParams, Redirect, useHistory } from "react-router-dom";
import { Check, Clear } from "@material-ui/icons";

interface EditPageProps {
  vacations: IVacation[];
  editVacation(
    vacation: {
      description: string;
      destination: string;
      startDate: Date;
      endDate: Date;
      price: number | string;
      image: string;
      followers: number;
    },
    id: number
  ): Promise<boolean>;
}

export function _EditPage(props: EditPageProps) {
  const { vacations, editVacation } = props;

  const { id } = useParams();

  const classes = useEditPageStyles();

  const history = useHistory();

  const [newDescription, setNewDescription] = useState("");
  const [newDestination, setNewDestination] = useState("");
  const [newStartDate, setNewStartDate] = useState(new Date());
  const [newEndDate, setNewEndDate] = useState(new Date());
  const [newPrice, setNewPrice] = useState("" as number | string);
  const [newImage, setNewImage] = useState("");

  if (!vacations.length) {
    return null;
  }

  const index = vacations.findIndex((vacation) => vacation.id === Number(id));

  if (index === -1) {
    return <Redirect to="/vacations" />;
  }

  const {
    description,
    destination,
    startDate,
    endDate,
    price,
    image,
    followers,
  } = vacations[index];

  if (!newDescription) {
    setNewDescription(description);
    setNewDestination(destination);
    setNewStartDate(startDate);
    setNewEndDate(endDate);
    setNewPrice(price);
    setNewImage(image);
  }

  const isDisabled =
    (description === newDescription || newDescription.length < 30) &&
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

  const handleEditVacation = async (event: FormEvent) => {
    event.preventDefault();

    const success = await editVacation(
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

    if (!success) {
      return;
    }

    history.goBack();
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
              label={`Destination (${newDestination.length}/30)`}
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
              label={`Description (30) (${newDescription.length}/200)`}
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
              label={`Image URL (PNG/JPG) (${newImage.length}/200)`}
              inputProps={{ maxLength: 200 }}
              fullWidth
              required
              onChange={handleInputChange}
              value={newImage}
            />
          </Grid>
        </Grid>

        <div className={classes.buttons}>
          <Link to="/vacations">
            <Tooltip title="Cancel">
              <IconButton className={classes.button}>
                <Clear />
              </IconButton>
            </Tooltip>
          </Link>

          <Tooltip title="Confirm">
            <IconButton
              className={classes.button}
              disabled={isDisabled}
              type="submit"
            >
              <Check />
            </IconButton>
          </Tooltip>
        </div>
      </Paper>
    </form>
  );
}
