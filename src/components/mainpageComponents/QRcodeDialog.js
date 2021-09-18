import React, { useState, useEffect } from 'react'

import QRCode from 'qrcode'

import { useTheme } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
   closeBtn: {
      position: 'absolute',
      top: 15,
      right: 5
   },
   dialogTitle: {
      borderBottom: '1px solid #333',
      paddingRight: 75,
   },
   qrHolder: {
      padding: 100
   },
   smallQrHolder : {
      padding: 50
   },
   qrImg: {
      width: 250
   },
   smallQrImg: {
      width: 200
   }
})

const QRcodeDialog = ({ handeler, id }) => {

   const [src,setSrc] = useState('')
   useEffect(() => {
      QRCode.toDataURL(id, {errorCorrectionLevel: 'H'}).then(data=>setSrc(data))
   },[id])

   const theme = useTheme()
   const screenSizeXSmall = useMediaQuery(theme.breakpoints.only('xs'))

   const classes = useStyles()

   return (
      <Dialog open={ handeler.isOpen } onClose={ handeler.closeQR } className={ classes.dialog }>
         <DialogTitle className={ classes.dialogTitle }>
            QR Code
         </DialogTitle>
         <Container className={ screenSizeXSmall ? classes.smallQrHolder : classes.qrHolder }>
            <img src={ src } alt="qrcode" className={ screenSizeXSmall ? classes.smallQrImg : classes.qrImg }/>
         </Container>
         <Button 
            color='secondary'
            onClick={ handeler.closeQR }
            className={ classes.closeBtn }
         >
            <CloseIcon/>
         </Button>
      </Dialog>
   )
}

export default QRcodeDialog
