// Used to store actions to keep state between pages, ex active nav bar item

export const UPDATE_NAVBAR = 'UPDATE_NAVBAR'

export const updateNavbar = (item) => ({
    type: UPDATE_NAVBAR,
    payload: item
})