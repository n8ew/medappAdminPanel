import React from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
   rowHolder: {
      display: 'flex'
   },
   heading: {
      textTransform: 'uppercase',
      marginTop: 20,
      marginBottom: 20
   },
   label: {
      marginRight: 20
   },
   btn: {
      position: 'absolute',
      bottom: 10,
      right: 10
   },
   qrBtn: {
      position: 'absolute',
      right: 10,
      bottom: 50
   }
})

const TestDialog = ({ handeler, test }) => {

   const classes = useStyles()

   return (
      <Dialog open={ handeler.isOpen } onClose={ () => handeler.closeDialog() }>
         <DialogTitle style={{ borderBottom: "1px solid #333"}}>
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
            <DialogActions>
               <Button
                  color='primary'
                  variant='contained'
                  className={ classes.qrBtn }
               >QR</Button>
               <Button 
                  color='secondary'
                  variant='contained'
                  className={ classes.btn }
                  onClick={ () => handeler.closeDialog()}
               >
                  <CloseIcon/>
               </Button>
            </DialogActions>
         </Container>
      </Dialog>
   )
}

export default TestDialog
