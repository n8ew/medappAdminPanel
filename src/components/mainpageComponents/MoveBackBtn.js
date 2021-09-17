import React from 'react'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button'

import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
   backBtn: {
      position: 'absolute',
      top: 0,
      left: 0,
   }
})

const MoveBackBtn = ({ btnHendeler }) => {

   const classes = useStyles()

   return (
      <Button
         color='primary'
         className={ classes.backBtn }
         onClick={ () => btnHendeler() }
      >
         <ArrowBackIcon fontSize='large'/>
      </Button>
   )
}

export default MoveBackBtn
