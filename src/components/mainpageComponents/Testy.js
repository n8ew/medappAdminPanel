import React, { useContext, useState } from 'react'
import DbDataContext from '../../context/dbData/dbDataContext'

import TestDialog from './TestDialog'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
   contentHolder: {
      marginTop: 75,
      display: 'flex',
      flexDirection: "column",
      alignItems: 'center',
      position: 'relative'
   },
   list: {
      marginTop: 50,
      width: "60%",
      padding: 20,
      borderRadius: 20,
      boxShadow: "2px 2px 4px rgba(0,0,0,0.3)"
   },
   listItem: {
      marginBottom: 15,
      boxShadow: "1px 1px 2px rgba(0,0,0,0.3)",
      borderRadius: 10
   },
   backBtn: {
      position: 'absolute',
      top: 0,
      left: 0,
   },
   icons: {
      fontSize: 40
   }
})

const Testy = ({ handeler }) => {

   const dbDataContext = useContext(DbDataContext)
   const { tests } = dbDataContext

   // Test for dialog state holder
   const [testForDialog,setTestForDialog] = useState('')

   // TestDialog state
   const [isOpen,setIsOpen] = useState(false)
   const dialogHandeler = {
      openDialog : () => setIsOpen(true),
      closeDialog : () => setIsOpen(false),
      isOpen: isOpen
   }

   const setTest = id => {
      let test = tests.filter(test=>test._id === id)
      setTestForDialog(test[0])
      dialogHandeler.openDialog()
   }

   const classes = useStyles()

   return (
      <Container className={ classes.contentHolder }>
         <Typography
            variant='h2'
            component='h2'
            align='center'
         >
            Testy
         </Typography>
         <List className={ classes.list } component='ul'>
            {tests.map((test,index) => (
               <ListItem key={ index } className={ classes.listItem }>
                  <ListItemText primary={test._id} onClick={ () => setTest(test._id)} />
                  <Button color='secondary'>
                     <HighlightOffIcon />
                  </Button>
               </ListItem>
            ))}
         </List>
         <Button
            color='primary'
            className={ classes.backBtn }
            onClick={ () => handeler.moveHome() }
         >
            <ArrowBackIcon fontSize='large'/>
         </Button>
         {testForDialog?(<TestDialog handeler={ dialogHandeler } test={ testForDialog } />):""}
      </Container>
   )
}

export default Testy
