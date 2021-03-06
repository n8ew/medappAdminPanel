import React, { useState } from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles } from '@material-ui/core'
import QRcodeDialog from './QRcodeDialog'

const useStyles = makeStyles({
   rowHolder: {
      display: 'flex',
      paddingLeft: 25
   },
   dialogTitle: {
      borderBottom: '1px solid #333',
      paddingRight: 75
   },
   heading: {
      textTransform: 'uppercase',
      marginTop: 20,
      marginBottom: 20,

   },
   label: {
      marginRight: 20
   },
   btnsHolder: {
      marginBottom: 20
   },
   qrBtn: {
      width: 125,
      height: 50
   },
   closeBtn: {
      position: 'absolute',
      top: 15,
      right: 5
   }
})

const TestDialog = ({ handeler, test }) => {

   // QRcode Dialog State
   const [open,setOpen] = useState(false)
   const qrHandeler = {
      isOpen : open,
      openQR : () => setOpen(true),
      closeQR : () => setOpen(false)
   }

   const handleQRbtn = () => {
      qrHandeler.openQR()
   }

   const classes = useStyles()

   return (
      <Dialog open={ handeler.isOpen } onClose={ handeler.closeDialog }>
         <DialogTitle className={ classes.dialogTitle } >
            Test ID: { test._id }
         </DialogTitle>
         <Container>
            <Typography
               variant='h5'
               component='h5'
               className={ classes.heading }
            >{ test.testName }
            </Typography>
            {test.params.map((param,index) => (
               <Container className={ classes.rowHolder } key={ index }>
                  <DialogContentText className={ classes.label }>{param.key} :</DialogContentText>
                  <DialogContentText>{param.value}</DialogContentText>
               </Container>
            ))}
            <DialogActions className={ classes.btnsHolder }>
               <Button
                  color='primary'
                  variant='contained'
                  className={ classes.qrBtn }
                  onClick={ handleQRbtn }
               >QR Code</Button>
            </DialogActions>
         </Container>
         <Button 
            color='secondary'
            onClick={ handeler.closeDialog }
            className={ classes.closeBtn }
         >
            <CloseIcon/>
         </Button>
         <QRcodeDialog handeler={ qrHandeler } id={ test._id } />
      </Dialog>
   )
}

export default TestDialog
