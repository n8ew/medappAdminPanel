import React, { createContext, useState } from 'react'
import axios from 'axios'

export const DBContext = createContext()

const DBContextProvider = props => {

   const initialState = {
      loading: false,
      logedIn: false
   }

   const [state,setState] = useState(initialState)

   // Heandeling loading mechanic
   const setLoading = () => setState({ ...state, loading : !state.loading })

   // LogIn Administrator
   const logIn = async (data) => {
      const config = {
         headers: {
            "Content-Type": "application/json"
         }
      }
      const res = await axios.post('/api/v1/admin', data, config)
      if(res.data.success) {
         return setState({ ...state, logedIn: true })
      }
   }

   return (
      <DBContext.Provider value={{ logIn, setLoading,  state }}> 
         { props.children }
      </DBContext.Provider>
   )
}

export default DBContextProvider
