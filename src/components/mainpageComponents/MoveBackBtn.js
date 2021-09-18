import React from 'react'

import { useTheme } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button'

import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
   backBtn: {
      position: 'absolute',
      top: 0,
      left: 0,
   },
   smallBackBtn: {
      position: 'absolute',
      top: -60,
      left: 0,
   }
})

const MoveBackBtn = ({ btnHendeler }) => {

   const theme = useTheme()
   const screenSizeXSmall = useMediaQuery(theme.breakpoints.only('xs'))

   const classes = useStyles()

   return (
      <Button
         color='primary'
         className={ screenSizeXSmall ? classes.smallBackBtn : classes.backBtn }
         onClick={ () => btnHendeler() }
      >
         <ArrowBackIcon fontSize='large'/>
      </Button>
   )
}

export default MoveBackBtn
