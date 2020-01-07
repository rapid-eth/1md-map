import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    marginBottom: 15
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 4
  },
  pos: {
    marginBottom: 12
  },
  cardActions: {}
});

const cardStyle = makeStyles({
  card: {
    color: "white",
    marginTop: 15,
    border: "1px solid white",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    boxShadow: "3px 3px rgba(255, 255, 255, 0.1)"
  },
  button: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    color: "white",
    letterSpacing: ".15rem",
    border: ".5px solid white",

    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.5)"
    }
  }
});

export default function SimpleCard({ name, link }) {
  const classes = useStyles();
  const cardWork = cardStyle();
  return (
    <Card className={clsx(classes.card, cardWork.card)}>
      <CardContent>
        <Typography gutterBottom>{name}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          className={clsx(cardWork.button, cardWork.overridesUnderline)}
          variant="contained"
          size="small"
          href={link}
          target="_blank"
        >
          details
        </Button>
      </CardActions>
    </Card>
  );
}
