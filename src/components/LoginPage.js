import React, { useState, useContext, useEffect } from 'react'
import DbDataContext from '../context/dbData/dbDataContext'
import { useHistory } from 'react-router-dom'

import { useFormik } from 'formik'

import { useTheme } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'

import { makeStyles } from '@material-ui/core'

// ComponentStyles

// materialUI styles
const useStyles = makeStyles({
   mainContainer: {
      marginTop: 50
   },
   formHolder: {
      marginTop: 50,
      display: 'flex',
      justifyContent: "center",
      alignItems: "center",
   },
   smallFormHolder: {
      // marginTop: 15,
      display: 'flex',
      justifyContent: "center",
      alignItems: "center",
   },
   input: {
      marginBottom: 20
   },
   btn: {
      marginTop: 25,
      marginBottom: 25,
      width: 250,
      alignSelf: "center"
   },
   extraBtn: {
      textTransform: "lowercase",
      width: 150,
      marginTop: 25
   }
})

const LoginPage = () => {

   const history = useHistory()

   const dbDataContext = useContext(DbDataContext)
   const { loginAdmin, isLogged } = dbDataContext

   useEffect(() => {
      if(isLogged) {
         history.push('/main')
      }
   }, [isLogged, history])

   const theme = useTheme()
   const screenSizeXSmall = useMediaQuery(theme.breakpoints.only('xs'))


   // DIALOG brak hasla
   // dialog state
   const [hasloDialog,setHasloDialog] = useState(false)
   // dialog dunctions
   const handleHasloDialogOpen = () => setHasloDialog(true)
   const handleHasloDialogClose = () => setHasloDialog(false)

   // FormikStuff
   // form validation
   const validate = values => {
      const errors= {}
      // validate login
      if(!values.login) {
         errors.login = true
      }
      // validate haslo
      if(!values.password) {
         errors.password = true
      }

      return errors
   }
   // formik
   const formik = useFormik({
      initialValues: {
         login: '',
         password: ''
      },
      validate,
      onSubmit: (data,{ resetForm }) => {
        loginAdmin(data)
        resetForm()
      }
   })

   const classes = useStyles()

   return (
      <Container className={ classes.mainContainer }>
         <Typography
            variant={ screenSizeXSmall ? 'h5' : 'h4'}
            component='h4'
            align='center'
         >
            Zaloguj sie do panelu administracyjnego
         </Typography>
         <Container className={ screenSizeXSmall ? classes.smallFormHolder:classes.formHolder }>
            <form className="form" onSubmit={ formik.handleSubmit }>
               <TextField
                  id='login'
                  name='login'
                  label='Login'
                  type='text'
                  className={ classes.input }
                  value={ formik.values.login}
                  onChange={ formik.handleChange }
               />
               <TextField
                  id='password'
                  name='password'
                  label='Haslo'
                  type='password'
                  className={ classes.input }
                  value={ formik.values.password }
                  onChange={ formik.handleChange }
               />
               <Button
                  variant='contained'
                  color='primary'
                  size='large'
                  type='submit'
                  className={ classes.btn }
               >Zaloguj</Button>
               <Button
                  variant='text'
                  className={ classes.extraBtn }
                  onClick={ handleHasloDialogOpen }
               >
                  Zapomiales hasla ?
               </Button>
            </form>
         </Container>
         <Dialog
            open={ hasloDialog }
            onClose={ handleHasloDialogClose }
         >
            <DialogTitle style={{ borderBottom: "1px solid #333"}}>
               To zrozumiale, ale nie rob tego wiecej
            </DialogTitle>
               <Container style={{ marginTop: "20px"}}>
                  <DialogContentText>
                     login: "admin"
                  </DialogContentText>
                  <DialogContentText>
                     haslo: "admin"
                  </DialogContentText>
               </Container>
            <DialogActions>
               <Button
                  variant='contained'
                  color='primary'
                  onClick={ handleHasloDialogClose }
               >
                  Zapamietam
               </Button>
            </DialogActions>
         </Dialog>
      </Container>
   )
}

export default LoginPage
