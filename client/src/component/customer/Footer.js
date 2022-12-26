import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  footer: {
    borderTop: '1px solid black',
    backgroundColor: 'white',
    padding: 4,
    paddingTop: 24,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  heading: {
    fontSize: 13,
    fontWeight: 700,
    marginBottom: 20,
    color: theme.palette.text.primary,
    textTransform: 'uppercase',
  },
  listLink: {
    fontSize: 14,
    marginBottom: 25,
    color: theme.palette.text.primary,
  },
  listImg: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 'auto',
  },
  img: {
    width: 50,
    height: 30,
    borderRadius: 0,
  },
  email: {
    fontSize: 14,
    color: theme.palette.text.primary,
    minWidth: '200px',
    '& .MuiOutlinedInput-input': {
      padding: '12.5px 14px',
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderBottomColor: theme.palette.common.white,
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderBottomColor: theme.palette.common.white,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderBottomColor: theme.palette.common.white,
    },
    '&::placeholder': {
      color: theme.palette.text.primary,
      fontSize: 14,
    },
  },
  action: {
    marginTop: 20,
    padding: '11px 30px',
    fontSize: 16,
    fontWeight: 600,
    backgroundColor: '#BD1877',
    color: theme.palette.text.primary,
    borderRadius: 30,
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#a8136a',
    },
  },
}))

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
