import {
   SET_LOADING, LOGIN_ADMIN, LOGOUT_ADMIN, GET_TESTS, GET_TESTS_SCHEMAS, ADD_NEW_TEST, DELETE_TEST
} from '../types'

// eslint-disable-next-line
export default (state, action) => {
   switch (action.type) {
      case SET_LOADING:
         return {
            ...state,
            loading: true
         }
      case LOGIN_ADMIN:
         return {
            ...state,
            isLogged: action.payload,
            loading: false
         }
      case LOGOUT_ADMIN:
         return {
            ...state,
            isLogged: false,
            loading: false
         }
      case GET_TESTS: 
         return {
            ...state,
            tests: action.payload,
            loading: false
         }
      case GET_TESTS_SCHEMAS:
         return {
            ...state,
            testsSchemas: action.payload,
            loading: false
         }
      case ADD_NEW_TEST:
         return {
            ...state,
            tests: [...state.tests, action.payload],
            loading: false
         }
      case DELETE_TEST:
         return {
            ...state,
            tests: state.tests.filter(test => test._id !== action.payload),
            loading: false
         }
      default:
         return state;
   }
}