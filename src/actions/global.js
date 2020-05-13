// Used to store actions to keep state between pages, ex active nav bar item

export const UPDATE_NAVBAR = 'UPDATE_NAVBAR'
export const UPDATE_TABLE_PAGE = 'UPDATE_TABLE_PAGE'
export const UPDATE_COUNTRY_NAV = 'UPDATE_COUNTRY_NAV'

export const updateNavbar = (item) => ({
    type: UPDATE_NAVBAR,
    payload: item
})

export const updateTablePage = (item) => ({
    type: UPDATE_TABLE_PAGE,
    payload: item
})

export const updateCountryNavOption = (item) => ({
    type: UPDATE_COUNTRY_NAV,
    payload: item
})