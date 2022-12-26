import { Box, Typography } from '@material-ui/core'
import React from 'react'
import AdminLayout from './AdminLayout'
import { makeStyles } from '@material-ui/styles'
import { Line } from 'react-chartjs-2'

const useStyles = makeStyles((theme) => ({
  home: {
    position: 'relative',
    marginLeft: 300,
    padding: 40,
    backgroundColor: '#f5f6fa',
  },
  featured: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    overflow: 'hidden',
    marginBottom: 40,
  },
  featuredItem: {
    flex: 1,
    margin: '0px 20px',
    padding: 30,
    borderRadius: 10,
    cursor: 'pointer',
    boxShadow: '0 0 15px -10px rgba(0, 0, 0, 075)',
    backgroundColor: theme.palette.common.white,
  },
  featuredTitle: {
    fontSize: 20,
  },
  featuredMoneyContainer: {
    margin: '10px 0ox',
    display: 'flex',
    alignItems: 'center',
  },
  featuredMoney: {
    fontSize: 30,
    fontWeight: 600,
  },
  featuredMoneyRate: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 20,
  },
  featuredIcon: {
    fontSize: 14,
    marginLeft: 5,
    color: 'green',
  },
  featuredIconnegative: {
    color: 'red',
  },
  featuredSub: {
    fontSize: 15,
    color: 'gray',
  },
  chart: {
    margin: 20,
    padding: 20,
    backgroundColor: theme.palette.common.white,
    boxShadow: '0px 0px 15px -10px rgba(0, 0, 0, 0.75)',
  },
  chartTitle: {
    marginBottom: 20,
  },
}))

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
}

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
}

const Home = () => {
  const classes = useStyles()
  return (
    <AdminLayout>
      <Box className={classes.home}>
        <Box className={classes.featured}>
          <Box className={classes.featuredItem}>
            <Typography component="span" className={classes.featuredTitle}>
              Revenue
            </Typography>
            <Box classTypographyName={classes.featuredMoneyContainer}>
              <Typography component="span" className={classes.featuredMoney}>
                $1
              </Typography>
              <Typography
                component="span"
                className={classes.featuredMoneyRate}
              ></Typography>
            </Box>
            <span className={classes.featuredSub}>Compared to last month</span>
          </Box>
          <Box className={classes.featuredItem}>
            <span className={classes.featuredTitle}>Orders</span>
            <Box className={classes.featuredMoneyContainer}>
              <Typography component="span" className={classes.featuredMoney}>
                $4,415
              </Typography>
              <Typography
                component="span"
                className={classes.featuredMoneyRate}
              ></Typography>
            </Box>
            <span className={classes.featuredSub}>Compared to last month</span>
          </Box>
          <Box className={classes.featuredItem}>
            <Typography component="span" className={classes.featuredTitle}>
              Customers
            </Typography>
            <Box className={classes.featuredMoneyContainer}>
              <Typography component="span" className={classes.featuredMoney}>
                $2,225
              </Typography>
              <Typography
                component="span"
                className={classes.featuredMoneyRate}
              >
                +2.4
              </Typography>
            </Box>
            <Typography component="span" className={classes.featuredSub}>
              Compared to last month
            </Typography>
          </Box>
        </Box>

        <Box className={classes.chart}>
          <Typography component="h3" className={classes.chartTitle}>
            Users Analytics
          </Typography>
          <Line data={data} options={options} />
        </Box>
      </Box>
    </AdminLayout>
  )
}

export default Home
