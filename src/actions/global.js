// Used to store actions to keep state between pages, ex active nav bar item

export const UPDATE_NAVBAR = 'UPDATE_NAVBAR'
export const UPDATE_TABLE_PAGE = 'UPDATE_TABLE_PAGE'

export const updateNavbar = (item) => ({
    type: UPDATE_NAVBAR,
    payload: item
})

export const updateTablePage = (item) => ({
    type: UPDATE_TABLE_PAGE,
    payload: item
})