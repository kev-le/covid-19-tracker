import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import covidReducer from './covid'

export default (history) => combineReducers({
  router: connectRouter(history),
  covid: covidReducer
})