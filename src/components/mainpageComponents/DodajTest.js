import React, { useContext } from 'react'
import DbDataContext from '../../context/dbData/dbDataContext'

const DodajTest = () => {

   const dbDataContext = useContext(DbDataContext)
   const { testsSchemas } = dbDataContext

   console.log(testsSchemas)

   return (
      <div>
         DODAJ TESTY
      </div>
   )
}

export default DodajTest
