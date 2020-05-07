import { combineReducers } from "redux"
import { 
    UPDATE_NAVBAR,
} from '../actions/global'

const initialStateNavbar = {
    selected: 'global',
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

export default combineReducers({ 
    navbar: updateNavbarReducer,
})