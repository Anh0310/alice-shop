import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core'
import React from 'react'
import { useStyles } from './styles'

const Footer = () => {
  const classes = useStyles()
  return (
    <footer className={classes.footer}>
      <Grid container spacing={1}>
        <Grid item lg={3} md={6} sm={12}>
          <List>
            <ListItem className={classes.list}>
              <Typography component="h3" className={classes.heading}>
                Customer Service
              </Typography>
              <ListItemText
                primary={
                  <>
                    <Typography>(1)877-708-3574</Typography>
                    <br />
                    <Typography>MON-FRI (GMT+9H)</Typography>
                    <Typography>9am - 6pm & 10pm - 7am</Typography>
                    <Typography>LUNCH (GMT+9H)</Typography>
                    <Typography>12:30am - 1:30pm & 2am - 3am</Typography>
                    <Typography>Closed on Sat, Sun & Holidays</Typography>
                    <Typography>EN : help@alice.co.vn"</Typography>
                  </>
                }
                className={classes.listLink}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item lg={3} md={6} sm={12}>
          <List>
            <ListItem className={classes.list}>
              <Typography component="h3" className={classes.heading}>
                Return Address
              </Typography>
              <ListItemText
                disableTypography
                primary={
                  <>
                    <Typography>(22011) Alice Store,</Typography>
                    <Typography>Cresent Mall,</Typography>
                    <Typography>10-79, District 7,</Typography>
                    <Typography>Ho Chi Minh City,</Typography>
                    <Typography>Viet Nam</Typography>
                  </>
                }
                className={classes.listLink}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item lg={3} md={6} sm={12}>
          <List>
            <ListItem className={classes.list}>
              <Typography component="h3" className={classes.heading}>
                Store
              </Typography>
              <ListItemText
                disableTypography
                primary={
                  <>
                    <Typography>Flagship Store</Typography>
                    <Typography>International</Typography>
                    <Typography>Department</Typography>
                    <Typography>Duty Free Shop</Typography>
                    <Typography>Oliveyoung</Typography>
                  </>
                }
                className={classes.listLink}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item lg={3} md={6} sm={12}>
          <List>
            <ListItem className={classes.list}>
              <Typography component="h3" className={classes.heading}>
                Help
              </Typography>
              <ListItemText
                disableTypography
                primary={
                  <>
                    <Typography>Q&A / FAQ</Typography>
                    <Typography>Shopping Guide</Typography>
                    <Typography>Shipping Guide</Typography>
                    <Typography>Contact Us</Typography>
                  </>
                }
                className={classes.listLink}
              />
            </ListItem>
          </List>
        </Grid>
        {/* <Grid item lg={4} md={6} sm={12}>
          <List>
            <ListItem className={classes.list}>
              <Typography component="h3" className={classes.heading}>
                NEWSLETTER
              </Typography>
              <TextField
                placeholder="Input your email here."
                className={classes.email}
                InputProps={{
                  classes: {
                    input: classes.email,
                  },
                }}
              />
              <Button className={classes.action}>Subcribe</Button>
            </ListItem>
          </List>
        </Grid> */}
      </Grid>
    </footer>
  )
}

export default Footer
