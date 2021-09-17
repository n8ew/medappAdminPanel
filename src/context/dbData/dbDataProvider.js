import React, { useReducer } from 'react'
import axios from 'axios'
import DbDataContext from './dbDataContext'
import DbDataReducer from './dbDataReducer'
import {
   SET_LOADING, LOGIN_ADMIN, LOGOUT_ADMIN, GET_TESTS, GET_TESTS_SCHEMAS, ADD_NEW_TEST, DELETE_TEST
} from '../types'

const DbDataProvider = props => {

   const initialState = {
      isLogged: false,
      loading: false,
      tests: [],
      testsSchemas: []
   }

   const [state, dispatch] = useReducer(DbDataReducer, initialState)

   // setLoading
   const setLoading = () => dispatch({ type: SET_LOADING })

   // loggin admin
   const loginAdmin = async (data) => {
      setLoading()

      const res = await axios.post('/api/v1/admin',data)
      dispatch({
         type: LOGIN_ADMIN,
         payload: res.data.success
      })
   }
   // logout admin
   const logoutAdmin = () => dispatch({ type: LOGOUT_ADMIN })
   // getTests
   const getTests = async () => {
      setLoading()
      const res = await axios.get('/api/v1/docs')
      dispatch({
         type: GET_TESTS,
         payload: res.data.docs
      })
   }
   // getTestsSchemas
   const getTestsSchemas = async() => {
      setLoading()
      const res = await axios.get('/api/v1/testsSchema')
      dispatch({
         type: GET_TESTS_SCHEMAS,
         payload: res.data.tests
      })
   }
   // addNewTest
   const addNewTest = async (data) => {
      setLoading()
      const res = await axios.post('/api/v1/docs', data)
      dispatch({
         type: ADD_NEW_TEST,
         payload: res.data.docs
      })
   }
   // deleteTest
   const deleteTest = async (id) => {
      setLoading()
      await axios.delete(`/api/v1/docs/${id}`)
      dispatch({
         type: DELETE_TEST,
         payload: id
      })
   }


   return (
      <DbDataContext.Provider
         value={{
            isLogged: state.isLogged,
            loading: state.loading,
            tests: state.tests,
            testsSchemas: state.testsSchemas,
            loginAdmin,
            logoutAdmin,
            getTests,
            getTestsSchemas,
            addNewTest,
            deleteTest
         }}
      >
         { props.children }
      </DbDataContext.Provider>
   )
}

export default DbDataProvider
