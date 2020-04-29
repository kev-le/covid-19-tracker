import axios from 'axios';

export const GET_GLOBALSUMMARY_REQ = 'GET_GLOBALSUMMARY_REQ'
export const GET_GLOBALSUMMARY_SUCCESS  = 'GET_GLOBALSUMMARY_SUCCESS'
export const GET_GLOBALSUMMARY_ERROR = 'GET_GLOBALSUMMARY_ERROR'

export const GET_GLOBALDAILY_REQ = 'GET_GLOBALDAILY_REQ'
export const GET_GLOBALDAILY_SUCCESS  = 'GET_GLOBALDAILY_SUCCESS'
export const GET_GLOBALDAILY_ERROR = 'GET_GLOBALDAILY_ERROR'

export const GET_COUNTRIES_REQ = 'GET_COUNTRIES_REQ'
export const GET_COUNTRIES_SUCCESS  = 'GET_COUNTRIES_SUCCESS'
export const GET_COUNTRIES_ERROR = 'GET_COUNTRIES_ERROR'

// Get the global summary up to current day (cumalative)
export const getGlobalSummary = () => {
    return dispatch => {
        dispatch({
            type: GET_GLOBALSUMMARY_REQ
        })

        return axios.get('https://covid19.mathdro.id/api').then(res => {
            dispatch({
                type: GET_GLOBALSUMMARY_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: GET_GLOBALSUMMARY_ERROR
            })
        })
    }
}

// Get the global daily cases (cumalative)
export const getGlobalDaily = () => {
    return dispatch => {
        dispatch({
            type: GET_GLOBALDAILY_REQ
        })

        return axios.get('https://covid19.mathdro.id/api/daily').then(res => {
            dispatch({
                type: GET_GLOBALDAILY_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: GET_GLOBALDAILY_ERROR
            })
        })
    }
}

// Get the iso codes for contries
export const getCountryCodes = () => {
    return dispatch => {
        dispatch({
            type: GET_COUNTRIES_REQ
        })

        return axios.get('https://covid19.mathdro.id/api/countries').then(res => {
            dispatch({
                type: GET_COUNTRIES_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: GET_COUNTRIES_ERROR
            })
        })
    }
}