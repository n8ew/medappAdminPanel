import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { useFormik } from 'formik'
import { DBContext } from '../context/DBContext'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'

import { makeStyles } from '@material-ui/core'

// ComponentStyles

// materialUI styles
const useStyles = makeStyles({
   mainContainer: {
      marginTop: 50
   }
})
// form styles
const formStyle = {
   display: 'flex',
   flexDirection: 'column'
}

const LoginPage = () => {

   
   const { logIn, setLoading, state } = useContext(DBContext)
   const history = useHistory()
   useEffect(() => {
      console.log(state.logedIn,'this is useEffect')
   } ,[state.logedIn])

   // DIALOG
   // dialog state
   const [dialogState, setDialogState] = useState(false)
   // dialog functions
   const handleDialogOpen = () => setDialogState(true)
   const handleDialogClose = () => setDialogState(false)

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
      onSubmit: data => {
         if(!state.loading) {
            setLoading()
            logIn(data)
            setLoading()
         }
      }
   })

   const classes = useStyles()

   return (
      <Container className={ classes.mainContainer }>
         <Typography
            variant='h4'
            component='h4'
            align='center'
         >
            Zaloguj sie do panelu administracyjnego
         </Typography>
         <Container>
            <form style={ formStyle } onSubmit={ formik.handleSubmit }>
               <TextField
                  id='login'
                  name='login'
                  label='Login'
                  type='text'
                  value={ formik.values.login}
                  onChange={ formik.handleChange }
               />
               <TextField
                  id='password'
                  name='password'
                  label='Haslo'
                  type='password'
                  value={ formik.values.password }
                  onChange={ formik.handleChange }
               />
               <Button
                  variant='contained'
                  color='primary'
                  size='large'
                  type='submit'
               >Zaloguj</Button>
            </form>
         </Container>
         <Dialog
            open={ dialogState }
            onClose={ handleDialogClose }
         >
            <DialogTitle>
               Logowanie nie powiodlo sie.
            </DialogTitle>
            <DialogActions>
               <Button
                  onClick={ handleDialogClose }
                  color='primary'
               >
                  Zamknij
               </Button>
            </DialogActions>
         </Dialog>
      </Container>
   )
}

export default LoginPage
