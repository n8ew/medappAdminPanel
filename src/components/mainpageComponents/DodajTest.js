import React, { useContext, useState, useEffect } from 'react'
import DbDataContext from '../../context/dbData/dbDataContext'

import MoveBackBtn from './MoveBackBtn'

import { useTheme } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
   contentHolder: {
      position: 'relative',
      marginTop: 75,
      display: 'flex',
      flexDirection: "column",
      alignItems: 'center'
   },
   selectHolder: {
      width: "100%",
      marginBottom: 20,
   },
   inputRow: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20
   },
   label: {
      marginRight: 20,
      marginLeft: 20
   },
   btn: {
      marginTop: 50,
      width: 200,
      height: 50,
      alignSelf: 'center'
   }
})

const DodajTest = ({ handeler }) => {

   const dbDataContext = useContext(DbDataContext)
   const { testsSchemas, addNewTest, getTestsSchemas } = dbDataContext

   useEffect(() => {
      getTestsSchemas()
   },[])

   const initialState = {testName: '', params: []}

   const [newTest,setNewTest] = useState(initialState)

   const getPickedTestParams = () => testsSchemas.filter(schema=>schema.testName === newTest.testName)[0].params

   useEffect(() => {
      if(newTest.testName !== '') {
         setNewTest({ ...newTest, params: getPickedTestParams()})
      }
   }, [newTest.testName])

   const handleSelectChange = e => setNewTest({...newTest, testName: e.target.value })
   const handleParamChange = e => {
      const arr = newTest.params
      const changedArrr = arr.map(element => {
         if(element.key === e.target.name) {
            return element = { key: e.target.name, value: e.target.value}
         }
         return element
      })
      setNewTest({ ...newTest,params:changedArrr})
   }
   const handleSubmit = e => {
      e.preventDefault()
      if(newTest.testName !== '' && newTest.params.length > 0) {
         addNewTest(newTest)
         setNewTest(initialState)
         handeler.moveHome( )
      }
   }

   const theme = useTheme()
   const screenSizeXSmall = useMediaQuery(theme.breakpoints.only('xs'))

   const classes = useStyles()

   return (
      <Container className={ classes.contentHolder }>
         <Typography
            variant={ screenSizeXSmall ? 'h3' : 'h3'}
            component={ screenSizeXSmall ? 'h3' : 'h3'}
            align='center'
         >
            Dodaj Test
         </Typography>
         <form className='form' onSubmit={ handleSubmit }>
            <FormControl className={ classes.selectHolder }>
               <InputLabel>Rodzaj testu:</InputLabel>
               <Select
                  value={ newTest.testName }
                  onChange={ handleSelectChange }
               >
                  {testsSchemas.map(test => (
                     <MenuItem
                        key={test._id}
                        value={test.testName}
                     >
                     {test.testName}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
            { newTest.params.length > 0 && newTest.params.map((param,index)=>(
               <FormControl className={ classes.inputRow }>
                  <Typography className={ classes.label } varaint='h6'>{ param.key }</Typography>
                  <TextField
                     name={param.key}
                     id={toString(index)}
                     index={parseInt(index)}
                     key={index}
                     type='number'
                     inputProps={{ step:'0.01' }}
                     value={newTest.params[index].value}
                     onChange={ handleParamChange }
                  />
               </FormControl>
            )) }
            <Button
               type='submit'
               variant='contained'
               color='primary'
               className={ classes.btn }
            >Dodaj</Button>
         </form>
         <MoveBackBtn btnHendeler={ handeler.moveHome } />
      </Container>
   )
}

export default DodajTest
