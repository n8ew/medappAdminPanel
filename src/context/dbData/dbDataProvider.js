import React, { useReducer } from 'react'
import axios from 'axios'
import DbDataContext from './dbDataContext'
import DbDataReducer from './dbDataReducer'
import {
   SET_LOADING, LOGIN_ADMIN, LOGOUT_ADMIN, GET_TESTS
} from '../types'

const DbDataProvider = props => {

   const initialState = {
      isLogged: false,
      loading: false,
      tests: []
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

   return (
      <DbDataContext.Provider
         value={{
            isLogged: state.isLogged,
            loading: state.loading,
            tests: state.tests,
            loginAdmin,
            logoutAdmin,
            getTests
         }}
      >
         { props.children }
      </DbDataContext.Provider>
   )
}

export default DbDataProvider
