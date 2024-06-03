import React from 'react'
import { Box } from "@mui/material"
import { makeStyles } from '@mui/styles'
import '../../Styles/Resourses.css'
import ResponsiveTabs from './ResponsiveTabs'

const useStyles = makeStyles({

  container: {
    width: "100%",
  },

})
function Resources() {
  const classes = useStyles()
  return (

    <Box className={classes.container}>
      <ResponsiveTabs />
    </Box>


  )
}

export default Resources
