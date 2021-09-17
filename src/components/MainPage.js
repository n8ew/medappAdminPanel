import React, { useEffect, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import DbDataContext from '../context/dbData/dbDataContext'

import Index from './mainpageComponents/Index'
import Testy from './mainpageComponents/Testy'
import DodajTest from './mainpageComponents/DodajTest'

import Container from '@material-ui/core/Container'

const MainPage = () => {

   const [currentComponent,setCurrentComponent] = useState(0)
   
   const componentHadeler = {
      moveHome : () => { setCurrentComponent(0) },
      moveTesty : () => { setCurrentComponent(1) },
      moveDodajTesty: () => { setCurrentComponent(2) }
   }
   const components = [<Index handeler={ componentHadeler } />, <Testy handeler={ componentHadeler } />, <DodajTest handeler={ componentHadeler } />]

   const history = useHistory()

   const dbDataContext = useContext(DbDataContext)
   const { isLogged, getTests, getTestsSchemas, tests } = dbDataContext

   useEffect(() => {
      if(!isLogged) {
         history.push('/')
      }
   }, [isLogged])

   useEffect(() => {
      getTests()
      getTestsSchemas()
   },[tests])

   return (
      <Container>
         { components[currentComponent] }
      </Container>
   )
}

export default MainPage
