import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import covidReducer from './covid'
import globalReducer from './global'

export default (history) => combineReducers({
  router: connectRouter(history),
  covid: covidReducer,
  global: globalReducer
})