import { makeStyles } from "@material-ui/core/styles"
import Timeline from "@material-ui/lab/Timeline"
import TimelineItem from "@material-ui/lab/TimelineItem"
import TimelineSeparator from "@material-ui/lab/TimelineSeparator"
import TimelineConnector from "@material-ui/lab/TimelineConnector"
import TimelineContent from "@material-ui/lab/TimelineContent"
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent"
import TimelineDot from "@material-ui/lab/TimelineDot"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import LinearProgress from '@material-ui/core/LinearProgress';




const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
    margin: "25px"
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  typography1: {
    fontSize : "0.75rem",
  },
  typography2: {
    fontSize : "1.1rem",
  },
 
}))

export default function Info({ data ,loading }) {

  const classes = useStyles()

  return (
    <Timeline align="alternate">
      {loading ?<LinearProgress className = {classes.paper} />  : null}
      {data
        ? data.map((item, index) => {
            return (
              <TimelineItem key ={index}>
                <TimelineOppositeContent>
                  <Typography variant="body2" color="textSecondary" className = {classes.typography1}>
                    {item.Date}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot>
                    <LocalShippingIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h6" component="h1" className = {classes.typography2}>
                      {item.StatusDescription}
                    </Typography>
                    <Typography className = {classes.typography1}>{item.Details}</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            )
          })
        : null}
    </Timeline>
  )
}
