import { combineReducers } from "redux"
import { 
    GET_GLOBALDAILY_ERROR,
    GET_GLOBALDAILY_SUCCESS,
    GET_GLOBALDAILY_REQ,
    GET_GLOBALSUMMARY_ERROR,
    GET_GLOBALSUMMARY_REQ,
    GET_GLOBALSUMMARY_SUCCESS
} from '../actions/covid' 

const initialStateGlobalDaily = []
const initialStateGlobalSummary = {
    confirmed: { value: "0" },
    deaths: { value: "0" },
    recovered: { value: "0" },
    isLoading: true
}

const globalSummaryReducer = (state = initialStateGlobalSummary, action) => {
    switch (action.type) {
        case GET_GLOBALSUMMARY_REQ:
            return {
                ...state,
                isLoading: true,
            }
        case GET_GLOBALSUMMARY_SUCCESS:
            return {
                ...action.payload,
                isLoading: false
            }
        case GET_GLOBALSUMMARY_ERROR:
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state
    }
}

const globalDailyReducer = (state = initialStateGlobalDaily, action) => {
    switch (action.type) {
        case GET_GLOBALDAILY_REQ:
            return {
                ...state,
            }
        case GET_GLOBALDAILY_SUCCESS:
            return action.payload
        case GET_GLOBALDAILY_ERROR:
            return {
                ...state,
            }
        default:
            return state
    }
}

export default combineReducers({ 
    globalDaily: globalDailyReducer,
    globalSummary: globalSummaryReducer
})