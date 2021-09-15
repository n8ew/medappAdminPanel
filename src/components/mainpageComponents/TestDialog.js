import React from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close';

const TestDialog = ({ handeler, test }) => {
   return (
      <Dialog open={ handeler.isOpen } onClose={ () => handeler.handleClose() }>
         <DialogTitle style={{ borderBottom: "1px solid #333"}}>
            { test._id }
         </DialogTitle>
         <Container>
            <Typography
               variant='h6'
               component='h6'
            >{ test.testName }
            </Typography>
            {test.params.map((param,index) => (
               <Container key={ index }>
                  <DialogContentText>holder</DialogContentText>
               </Container>
            ))}
            <DialogActions>
               <Button onClick={ () => handeler.closeDialog()}>
                  <CloseIcon/>
               </Button>
            </DialogActions>
         </Container>
      </Dialog>
   )
}

export default TestDialog
