import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
import { Comment } from "../Comment/Comment";
import { useCommentsPageStyles } from "./styles";
import { IVacation } from "../../models/vacation";
import { useParams, Redirect, Link, useHistory } from "react-router-dom";
import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Grid,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  TextField,
  Button,
} from "@material-ui/core";
import {
  Favorite,
  FavoriteBorder,
  ArrowBack,
  Clear,
  Edit,
} from "@material-ui/icons";

interface CommentsPageProps {
  vacations: IVacation[];
  isAdmin: boolean;
  toggleFollow(id: number, isFollowing: number): void;
  deleteVacation(id: number): void;
  getVacationComments(id: number): void;
  addComment(id: number, comment: string): void;
}

export function _CommentsPage(props: CommentsPageProps) {
  const { id } = useParams();

  const classes = useCommentsPageStyles();

  const [open, setOpen] = useState(false);

  const [comment, setComment] = useState("");

  const history = useHistory();

  const {
    vacations,
    isAdmin,
    toggleFollow,
    deleteVacation,
    getVacationComments,
    addComment,
  } = props;

  if (!vacations.length) {
    return null;
  }

  const vacation = vacations.find((vacation) => vacation.id === Number(id));

  if (!vacation) {
    return <Redirect to="/vacations" />;
  }

  if (!vacation.comments) {
    getVacationComments(Number(id));
  }

  const { destination, image, isFollowing, comments } = vacation;

  if (!comments) {
    return null;
  }

  const openModal = (): void => {
    setOpen(true);
  };

  const closeModal = (): void => {
    setOpen(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    setComment(value);
  };

  const handleToggleFollow = (): void => {
    toggleFollow(Number(id), isFollowing);
  };

  const handleDeleteVacation = async (): Promise<void> => {
    setOpen(false);

    await deleteVacation(id);

    history.push("/vacations");
  };

  const handleAddComment = (event: FormEvent) => {
    event.preventDefault();

    addComment(Number(id), comment);
  };

  return (
    <>
      <ConfirmModal
        open={open}
        handleClose={closeModal}
        handleConfirm={handleDeleteVacation}
        title="Delete vacation?"
      />

      <Grid container component="main" className={classes.root}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          className={classes.image}
          style={{ backgroundImage: `url(${image})` }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Grid container spacing={2}>
              <Link to="/vacations">
                <Tooltip title="Back">
                  <IconButton>
                    <ArrowBack />
                  </IconButton>
                </Tooltip>
              </Link>

              {isAdmin ? (
                <>
                  <Tooltip title="Delete">
                    <IconButton onClick={openModal}>
                      <Clear />
                    </IconButton>
                  </Tooltip>

                  <Link to={`/edit/${id}`}>
                    <Tooltip title="Edit">
                      <IconButton>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                  </Link>
                </>
              ) : (
                <Tooltip title={isFollowing ? "Unfollow" : "Follow"}>
                  <IconButton onClick={handleToggleFollow}>
                    {isFollowing ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                </Tooltip>
              )}
            </Grid>

            <Typography variant="h3">{destination}</Typography>

            {isAdmin ? null : (
              <form className={classes.form} onSubmit={handleAddComment}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  label={`${comment.length}/100`}
                  multiline
                  inputProps={{ maxLength: 100 }}
                  fullWidth
                  value={comment}
                  onChange={handleInputChange}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={Boolean(!comment.trim().length)}
                >
                  Add Comment
                </Button>
              </form>
            )}
            <Grid container spacing={6} className={classes.container}>
              {!comments.length ? (
                <Grid item xs>
                  <h1>Looks like there's no comments yet. Be the first!</h1>
                </Grid>
              ) : (
                comments.map((comment, i) => <Comment key={i} {...comment} />)
              )}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
