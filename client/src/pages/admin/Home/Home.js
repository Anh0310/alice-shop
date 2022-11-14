import { Box } from '@material-ui/core'
import React from 'react'
import AdminLayout from '../../../component/admin/AdminLayout/AdminLayout'
import Chart from '../../../component/admin/Chart/Chart'
import FeaturedInfo from '../../../component/admin/FeaturedInfo/FeaturedInfo'
import { useStyles } from './styles'

const Home = () => {
  const classes = useStyles()
  return (
    <AdminLayout>
      <Box className={classes.home}>
        <FeaturedInfo />
        <Chart />
      </Box>
    </AdminLayout>
  )
}

export default Home
