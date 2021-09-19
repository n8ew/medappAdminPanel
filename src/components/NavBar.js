import React, { useContext } from 'react'
import DbDataContext from '../context/dbData/dbDataContext'

import { useTheme } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
   text: {
      color: '#eee'
   }
})

const NavBar = () => {

   const dbDataContext = useContext(DbDataContext)
   const { isLogged, logoutAdmin } = dbDataContext

   const theme = useTheme()
   const isLg = useMediaQuery(theme.breakpoints.only('lg')) 
   const isEl = useMediaQuery(theme.breakpoints.only('xl'))
   const bigScreen = () => {
      if( isLg || isEl ) {
         return true
      }
      return false
   }

   const classes = useStyles()

   const navboxStyle = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: 'center',
      width:  bigScreen ? "60%":"80%",
      height: "10vh",
   }
   const navStyle = {
      minWidth: "100vw",
      display: 'flex',
      alignItems: 'center',
      justifyContent: "center",
      backgroundColor: "#0077b6"
   }

   return (
      <nav style={navStyle}>
         <div style={ navboxStyle }>
            <Typography
               variant='h6'
               component='h6'
               className={ classes.text }
            >
               MedApp
            </Typography>
            <Button 
               className={ classes.text }
               style={{ visibility: isLogged? "visible": "hidden" , fontWeight: 'bold'}}
               onClick={ logoutAdmin }
            >Wyloguj</Button>
         </div>
      </nav>
   )
}

export default NavBar
