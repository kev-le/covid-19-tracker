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

export const GET_COUNTRY_STATS_REQ = 'GET_COUNTRY_STATS_REQ'
export const GET_COUNTRY_STATS_SUCCESS  = 'GET_COUNTRY_STATS_SUCCESS'
export const GET_COUNTRY_STATS_ERROR = 'GET_COUNTRY_STATS_ERROR'

export const GET_COUNTRYREGION_REQ = 'GET_COUNTRYREGION_REQ'
export const GET_COUNTRYREGION_SUCCESS  = 'GET_COUNTRYREGION_SUCCESS'
export const GET_COUNTRYREGION_ERROR = 'GET_COUNTRYREGION_ERROR'

export const GET_ALL_COUNTRY_REQ = 'GET_ALL_COUNTRY_REQ'
export const GET_ALL_COUNTRY_SUCCESS  = 'GET_ALL_COUNTRY_SUCCESS'
export const GET_ALL_COUNTRY_ERROR = 'GET_ALL_COUNTRY_ERROR'

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

// Get the individual stats for a country
export const getCountryStats = (isoCode, countryText) => {
    return dispatch => {
        dispatch({
            type: GET_COUNTRY_STATS_REQ
        })

        return axios.get('https://covid19.mathdro.id/api/countries/' + isoCode).then(res => {
            dispatch({
                type: GET_COUNTRY_STATS_SUCCESS,
                payload: { ...res.data, countryText: countryText, selectedCountry: isoCode }
            })
        }).catch(err => {
            dispatch({
                type: GET_COUNTRY_STATS_ERROR,
                payload: { countryText: countryText, selectedCountry: isoCode }
            })
        })
    }
}


// Get the region stats for a country (if any)
export const getCountryRegionStats = (isoCode) => {
    return dispatch => {
        dispatch({
            type: GET_COUNTRYREGION_REQ
        })

        return axios.get('https://covid19.mathdro.id/api/countries/' + isoCode + '/confirmed').then(res => {
            dispatch({
                type: GET_COUNTRYREGION_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: GET_COUNTRYREGION_ERROR
            })
        })
    }
}

// Get the stats for each country
export const getAllCountryStats = () => {
    return dispatch => {
        dispatch({
            type: GET_ALL_COUNTRY_REQ
        })

        return axios.get('https://covid19.mathdro.id/api/confirmed/').then(res => {
            let compiledCountries = {}
            let countryList = res.data

            // compile the regions into countries, i.e New York should add onto US count
            for (var i = 0; i < countryList.length; i++) {
              if (countryList[i].countryRegion in compiledCountries) {
                // found existing bucket, add stats onto it
                
                compiledCountries[countryList[i].countryRegion].active    += countryList[i].active
                compiledCountries[countryList[i].countryRegion].recovered += countryList[i].recovered
                compiledCountries[countryList[i].countryRegion].deaths    += countryList[i].active
                compiledCountries[countryList[i].countryRegion].confirmed += countryList[i].confirmed
        
              } else {
                // country not found, so add it to dict
                compiledCountries[countryList[i].countryRegion] = countryList[i]
              }
            }

            let data = Object.values(compiledCountries)

            dispatch({
                type: GET_ALL_COUNTRY_SUCCESS,
                payload: data
            })
        }).catch(err => {
            dispatch({
                type: GET_ALL_COUNTRY_ERROR
            })
        })
    }
}