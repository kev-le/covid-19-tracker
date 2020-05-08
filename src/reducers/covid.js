import { combineReducers } from "redux"
import { 
    GET_GLOBALDAILY_ERROR,
    GET_GLOBALDAILY_SUCCESS,
    GET_GLOBALDAILY_REQ,
    GET_GLOBALSUMMARY_ERROR,
    GET_GLOBALSUMMARY_REQ,
    GET_GLOBALSUMMARY_SUCCESS,
    GET_GLOBALSUMMARY_YESTERDAY_ERROR,
    GET_GLOBALSUMMARY_YESTERDAY_SUCCESS,
    GET_COUNTRIES_ERROR,
    GET_COUNTRIES_REQ,
    GET_COUNTRIES_SUCCESS,
    GET_COUNTRY_STATS_ERROR,
    GET_COUNTRY_STATS_REQ,
    GET_COUNTRY_STATS_SUCCESS,
    GET_COUNTRY_YESTERDAY_STATS_ERROR,
    GET_COUNTRY_YESTERDAY_STATS_SUCCESS,
    GET_COUNTRYREGION_ERROR,
    GET_COUNTRYREGION_REQ,
    GET_COUNTRYREGION_SUCCESS,
    GET_ALL_COUNTRY_ERROR,
    GET_ALL_COUNTRY_REQ,
    GET_ALL_COUNTRY_SUCCESS
} from '../actions/covid'

const initialStateGlobalDaily = {
    dates: [],
    cases: [],
    recovered: [],
    deaths: [],
    isLoading: true
}

const initialStateStats = {
    yesterday: {
        cases: 0,
        recovered: 0,
        deaths: 0,
        critical: 0,
        isLoading: true,
    },
    cases: 0,
    recovered: 0,
    deaths: 0,
    critical: 0,
    isLoading: true,
    error: '',
    countryText: '',
    selectedCountry: '',
    updated: '',
}


const initialStateCountryCodes = {
    countryList: [],
    isLoading: true
}

const initialStateAllCountry = {
    countryList: [],
    isLoading: true
}

const initialStateCountryRegion = {
    regionList: [],
    isLoading: true
}

const globalSummaryReducer = (state = initialStateStats, action) => {
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
        case GET_GLOBALSUMMARY_YESTERDAY_SUCCESS:
            return {
                ...state,
                yesterday : { isLoading: false, ...action.payload },
            }
        case GET_GLOBALSUMMARY_YESTERDAY_ERROR:
            return {
                ...state,
                isLoading: false,
                error: ''
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
                ...action.payload,
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

const countryStatsReducer = (state = initialStateStats, action) => {
    switch (action.type) {
        case GET_COUNTRY_STATS_REQ:
            return {
                ...state,
                ...initialStateStats,
                isLoading: true,
                error: ''
            }
        case GET_COUNTRY_STATS_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                error: ''
            }
        case GET_COUNTRY_YESTERDAY_STATS_SUCCESS:
            return {
                ...state,
                yesterday : { isLoading: false, ...action.payload },
            }
        case GET_COUNTRY_STATS_ERROR:
            return {
                ...initialStateStats,
                ...action.payload,
                isLoading: false,
                selectedCountry: action.payload.selectedCountry,
                error: 'Could not find stats for selected country.'
            }
        case GET_COUNTRY_YESTERDAY_STATS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: ''
            }
        default:
            return state
    }
}


const countryRegionStatsReducer = (state = initialStateCountryRegion, action) => {
    switch (action.type) {
        case GET_COUNTRYREGION_REQ:
            return {
                ...state,
                isLoading: true,
                error: ''
            }
        case GET_COUNTRYREGION_SUCCESS:
            return {
                regionList : action.payload,
                isLoading: false,
                error: ''
            }
        case GET_COUNTRYREGION_ERROR:
            return {
                ...initialStateCountryRegion,
                isLoading: false,
                error: ''
            }
        default:
            return state
    }
}

const allCountryReducer = (state = initialStateAllCountry, action) => {
    switch (action.type) {
        case GET_ALL_COUNTRY_REQ:
            return {
                ...state,
                isLoading: true,
                error: ''
            }
        case GET_ALL_COUNTRY_SUCCESS:
            return {
                countryList : action.payload,
                isLoading: false,
                error: ''
            }
        case GET_ALL_COUNTRY_ERROR:
            return {
                ...initialStateAllCountry,
                isLoading: false,
                error: ''
            }
        default:
            return state
    }
}

export default combineReducers({ 
    globalDaily: globalDailyReducer,
    globalSummary: globalSummaryReducer,
    countryCodes: countryCodesReducer,
    countryStats: countryStatsReducer,
    countryRegion: countryRegionStatsReducer,
    allCountry: allCountryReducer
})