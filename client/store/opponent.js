

// ACTION TYPES
const UPDATE_LIST = 'UPDATE_LIST'

// INITIAL STATE
const initialState = {}

// ACTION CREATORS
export const gotList = list => ({
    type: UPDATE_LIST,
    list
})
// REDUCER
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_LIST:
            return action.list
        default:
            return state
    }
}

export default reducer
