import { combineReducers } from "redux"
import { 
    GET_GLOBALDAILY_ERROR,
    GET_GLOBALDAILY_SUCCESS,
    GET_GLOBALDAILY_REQ,
    GET_GLOBALSUMMARY_ERROR,
    GET_GLOBALSUMMARY_REQ,
    GET_GLOBALSUMMARY_SUCCESS,
    GET_COUNTRIES_ERROR,
    GET_COUNTRIES_REQ,
    GET_COUNTRIES_SUCCESS
} from '../actions/covid'

const initialStateGlobalDaily = {
    confirmedList: [],
    isLoading: true
}
const initialStateGlobalSummary = {
    confirmed: { value: "0" },
    deaths: { value: "0" },
    recovered: { value: "0" },
    isLoading: true
}

const initialStateCountryCodes = {
    countryList: [],
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
                isLoading: true,
            }
        case GET_GLOBALDAILY_SUCCESS:
            return {
                confirmedList: action.payload,
                isLoading: false
            }
        case GET_GLOBALDAILY_ERROR:
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state
    }
}

const countryCodesReducer = (state = initialStateCountryCodes, action) => {
    switch (action.type) {
        case GET_COUNTRIES_REQ:
            return {
                ...state,
                isLoading: true,
            }
        case GET_COUNTRIES_SUCCESS:
            return {
                countryList: action.payload.countries,
                isLoading: false
            }
        case GET_COUNTRIES_ERROR:
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state
    }
}

export default combineReducers({ 
    globalDaily: globalDailyReducer,
    globalSummary: globalSummaryReducer,
    countryCodes: countryCodesReducer
})