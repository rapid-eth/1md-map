import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    marginBottom: 15,
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
  },
});

export default function SimpleCard({event, close}) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <IconButton aria-label="close" onClick={close}>
            <CloseIcon />
          </IconButton>
        }
        title={event.name}
        subheader={<Link href={event.link} target="_new" rel="noopener noreferrer">Meetup Page</Link>}
      />
      
      <CardContent>
        <Typography gutterBottom dangerouslySetInnerHTML={{__html: event.description}}>
        </Typography>
      </CardContent>
    </Card>
  );
}
