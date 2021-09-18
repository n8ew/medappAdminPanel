import React from 'react'

import { useTheme } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
   contentHolder: {
      marginTop: 100,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
   },
   heading: {
      marginBottom: 50
   },
   btn: {
      width: 200,
      height: 50,
      marginBottom: 25
   }
})

const Index = ({ handeler }) => {

   const theme = useTheme()
   const screenSizeXSmall = useMediaQuery(theme.breakpoints.only('xs'))

   const classes = useStyles()

   return (
      <Container className={ classes.contentHolder } >
         <Typography
            variant={ screenSizeXSmall ? 'h4' : 'h3'}
            component='h3'
            align='center'
            className={ classes.heading }
         >
            Witaj Adminie
         </Typography>
         <Button
            variant='contained'
            color='primary'
            onClick={ () => handeler.moveTesty()  }
            className={ classes.btn }
         >Testy</Button>
         <Button
            variant='contained'
            color='primary'
            onClick={ () => handeler.moveDodajTesty() }
            className={ classes.btn }
         >Dodaj Test</Button>
      </Container>
   )
}

export default Index
