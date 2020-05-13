import { combineReducers } from "redux"
import { 
    UPDATE_NAVBAR,
    UPDATE_TABLE_PAGE,
    UPDATE_COUNTRY_NAV
} from '../actions/global'

const initialStateNavbar = {
    selected: 'global',
}

const initialStateTablePage = {
    selected: 'cards'
}

const initialStateCountryNav = {
    selected: 'region'
}

const updateNavbarReducer = (state = initialStateNavbar, action) => {
    switch (action.type) {
        case UPDATE_NAVBAR:
            return {
                ...state,
                selected: action.payload,
            }
        default:
            return state
    }
}

const updateTablePageReducer = (state = initialStateTablePage, action) => {
    switch (action.type) {
        case UPDATE_TABLE_PAGE:
            return {
                ...state,
                selected: action.payload,
            }
        default:
            return state
    }
}

const updateCountryNavReducer = (state = initialStateCountryNav, action) => {
    switch (action.type) {
        case UPDATE_COUNTRY_NAV:
            return {
                ...state,
                selected: action.payload,
            }
        default:
            return state
    }
}

export default combineReducers({ 
    navbar: updateNavbarReducer,
    tablePage: updateTablePageReducer,
    countryNav: updateCountryNavReducer
})