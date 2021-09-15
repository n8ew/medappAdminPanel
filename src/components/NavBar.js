import React, { useContext } from 'react'
import DbDataContext from '../context/dbData/dbDataContext'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
   text: {
      color: '#023047'
   }
})

const NavBar = () => {

   const dbDataContext = useContext(DbDataContext)
   const { isLogged, logoutAdmin } = dbDataContext

   const classes = useStyles()

   const navboxStyle = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: 'center',
      width: "80%",
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
            <Typography
               variant='h5'
               component='h5'
               className={ classes.text }
            >
               Panel Administracyjny
            </Typography>
            <Button 
               className={ classes.text }
               style={{ visibility: isLogged? "visible": "hidden"}}
               onClick={ logoutAdmin }
            >Wyloguj</Button>
         </div>
      </nav>
   )
}

export default NavBar
