import React, { useContext, useState, useEffect } from 'react'
import DbDataContext from '../../context/dbData/dbDataContext'

import TestDialog from './TestDialog'
import MoveBackBtn from './MoveBackBtn'

import { useTheme } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

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
   smallList:{
      marginTop: 50,
      width: "100%",
      padding: 20,
      borderRadius: 20,
      boxShadow: "2px 2px 4px rgba(0,0,0,0.3)"
   },
   smallBtn: {
      position: 'relative',
      right: -20
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
   const { tests, deleteTest, getTests } = dbDataContext

   useEffect(() => {
      getTests()
   }, [])

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

   const handleDelete = id => deleteTest(id)

   const theme = useTheme()
   const screenSizeXSmall = useMediaQuery(theme.breakpoints.only('xs'))

   const classes = useStyles()

   return (
      <Container className={ classes.contentHolder }>
         <Typography
            variant={ screenSizeXSmall ? 'h3' : 'h2'}
            component={ screenSizeXSmall ? 'h3' : 'h2'}
            align='center'
         >
            Testy
         </Typography>
         <List className={ screenSizeXSmall ? classes.smallList : classes.list } component='ul'>
            { tests.length === 0 ? 
               (<Typography component='h5' align='center'>Lista testow jest pusta</Typography>) : 
               tests.map((test,index) => (
                  <ListItem key={ index } className={ classes.listItem }>
                     <ListItemText style={{ cursor: "pointer" }} primary={"Test ID: " + test._id} onClick={ () => setTest(test._id)} />
                     <Button className={ screenSizeXSmall && classes.smallBtn } color='secondary' onClick={ () => handleDelete(test._id)}>
                        <HighlightOffIcon />
                     </Button>
                  </ListItem>
            )) }
         </List>
         <MoveBackBtn btnHendeler={ handeler.moveHome } />
         {testForDialog?(<TestDialog handeler={ dialogHandeler } test={ testForDialog } />):""}
      </Container>
   )
}

export default Testy
