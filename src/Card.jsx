import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    marginBottom: 15
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardActions: {
    flexDirection: 'row-reverse'
  }
});

export default function SimpleCard({name, link}) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" component="h3" gutterBottom>
          {name}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button variant="contained" href={link} target="_blank">
          Learn more
        </Button>
      </CardActions>
    </Card>
  );
}
