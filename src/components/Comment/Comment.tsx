import { useCommentStyles } from "./styles";
import React from "react";
import { Grid, CardContent, Typography, Card } from "@material-ui/core";

interface CommentProps {
  comment: string;
  username: string;
}

export function Comment(props: CommentProps) {
  const classes = useCommentStyles();

  const { comment, username } = props;

  return (
    <Grid item xs={12}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            <strong>{username}</strong> said:
          </Typography>
          <Typography>{comment}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
